var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Restaurant = mongoose.model('Restaurant');

router.get('/API/Restaurants/', function(req, res, next) {
	  Restaurant.find(function(err, restaurants) {
	    if (err) { return next(err); }
	    res.json(restaurants);
	  });
	});

router.post('/API/Restaurants/', function (req, res, next) {
  let restaurant = new Restaurant(req.body);
  restaurant.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
