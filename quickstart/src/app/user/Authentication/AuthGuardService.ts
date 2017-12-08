import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  private router: any;
  private authService: AuthenticationService;
  private errorMsg: string;

  canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
    if (this.authService.user$.getValue()) {
      return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }

  onSubmit() {
  this.authService.login(this.authService.user$.value.username,
          this.authService.user$.value.password).subscribe(val => {
    if (val) {
      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
        this.authService.redirectUrl = undefined;
      } else {
        this.router.navigate(['/recipe/list']);
      }
    }
  }, err => this.errorMsg = err.json().message);
}
}
