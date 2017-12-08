var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  name: String,
  type: String,
});	

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;