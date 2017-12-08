const passport = require('passport');
const request = require('request');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../src/models/User');

passport.serializeUser((user, done) => {
	  done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
	  User.findById(id, (err, user) => {
	    done(err, user);
	  });
	});

	passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
	  User.findOne({ email: email.toLowerCase() }, (err, user) => {
	    if (err) { return done(err); }
	    if (!user) {
	      return done(null, false, { msg: `Email ${email} not found.` });
	    }
	    user.comparePassword(password, (err, isMatch) => {
	      if (err) { return done(err); }
	      if (isMatch) {
	        return done(null, user);
	      }
	      return done(null, false, { msg: 'Ongeldig email adress of paswoord.' });
	    });
	  });
	}));
	
	passport.use(new FacebookStrategy({
		  clientID: process.env.FACEBOOK_ID,
		  clientSecret: process.env.FACEBOOK_SECRET,
		  callbackURL: '/auth/facebook/callback',
		  profileFields: ['name', 'email'],
		  passReqToCallback: true
		}, (req, accessToken, refreshToken, profile, done) => {
		  if (req.user) {
		    User.findOne({ facebook: profile.id }, (err, existingUser) => {
		      if (err) { return done(err); }
		      if (existingUser) {
		        req.flash('errors', { msg: 'Je Facebook account is al gekoppeld aan Surfings. Je kan hiermee inloggen.' });
		        done(err);
		      } else {
		        User.findById(req.user.id, (err, user) => {
		          if (err) { return done(err); }
		          user.facebook = profile.id;
		          user.tokens.push({ kind: 'facebook', accessToken });
		          user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
		          user.save((err) => {
		            req.flash('info', { msg: 'Je bent nu verbonden via Facebook.' });
		            done(err, user);
		          });
		        });
		      }
		    });
		  } else {
		    User.findOne({ facebook: profile.id }, (err, existingUser) => {
		      if (err) { return done(err); }
		      if (existingUser) {
		        return done(null, existingUser);
		      }
		      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
		        if (err) { return done(err); }
		        if (existingEmailUser) {
		          req.flash('errors', { msg: 'Dit email adress is al in gebruik. Je kan inloggen met dit email adress of een ander gebruiken.' });
		          done(err);
		        } else {
		          const user = new User();
		          user.email = profile._json.email;
		          user.facebook = profile.id;
		          user.tokens.push({ kind: 'facebook', accessToken });
		          user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
		          user.save((err) => {
		            done(err, user);
		          });
		        }
		      });
		    });
		  }
		}));
	
	passport.use(new GoogleStrategy({
		  clientID: process.env.GOOGLE_ID,
		  clientSecret: process.env.GOOGLE_SECRET,
		  callbackURL: '/auth/google/callback',
		  passReqToCallback: true
		}, (req, accessToken, refreshToken, profile, done) => {
		  if (req.user) {
		    User.findOne({ google: profile.id }, (err, existingUser) => {
		      if (err) { return done(err); }
		      if (existingUser) {
		        req.flash('errors', { msg: 'Je Google account is al gekoppeld aan Surfings. Je kan hiermee inloggen.' });
		        done(err);
		      } else {
		        User.findById(req.user.id, (err, user) => {
		          if (err) { return done(err); }
		          user.google = profile.id;
		          user.tokens.push({ kind: 'google', accessToken });
		          user.profile.name = user.profile.name || profile.displayName;
		          user.save((err) => {
		            req.flash('info', { msg: 'Je Google account is nu gekoppeld.' });
		            done(err, user);
		          });
		        });
		      }
		    });
		  } else {
		    User.findOne({ google: profile.id }, (err, existingUser) => {
		      if (err) { return done(err); }
		      if (existingUser) {
		        return done(null, existingUser);
		      }
		      User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
		        if (err) { return done(err); }
		        if (existingEmailUser) {
		          req.flash('errors', { msg: 'Dit email adress is al in gebruik. Je kan inloggen met dit email adress of een ander gebruiken.' });
		          done(err);
		        } else {
		          const user = new User();
		          user.email = profile.emails[0].value;
		          user.google = profile.id;
		          user.tokens.push({ kind: 'google', accessToken });
		          user.profile.name = profile.displayName;
		          user.save((err) => {
		            done(err, user);
		          });
		        }
		      });
		    });
		  }
		}));

