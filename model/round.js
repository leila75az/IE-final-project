// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var roundSchema = new Schema({
  player1: String,
  player2:String,
  gameId:String,
  game: Object,
  player1score:Number,
  player2score:Number,
  turn:Number,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Round = mongoose.model('Round', roundSchema);

// make this available to our users in our Node applications
module.exports = Round;
