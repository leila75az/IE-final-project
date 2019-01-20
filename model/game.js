// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gameSchema = new Schema({
  creator: String,
  max_point: Number,
  dice: [Number],
  dice_num: Number,
  dice_max: Number,
  score: Number,
  created_at: Date,
  updated_at: Date,
  queue:[String]
});

// the schema is useless so far
// we need to create a model using it
var Game = mongoose.model('Game', gameSchema);

// make this available to our users in our Node applications
module.exports = Game;
