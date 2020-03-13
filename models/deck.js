let mongoose = require('mongoose');
let cardSchema = require('./cardSchema');

//this pattern lets us define comment recursively
var Comment = new mongoose.Schema();
Comment.add({
  owner: String,
  ownerName: String,
  content: String,
  index: Number,
  timePosted: Date,
  comments: [Comment],
  updated: Boolean,
  image: {
    type: String,
    default: 'https://img.scryfall.com/cards/art_crop/front/0/c/0c082aa8-bf7f-47f2-baf8-43ad253fd7d7.jpg?1562826021',
  },
  artist: {
    type: String,
    default: 'Allan Pollack',
  },
});

//data for each seat, human or bot
const SeatDeck = {
  bot: [String], //null bot value means human player
  userid: String,
  username: String,
  pickorder: [cardSchema],
  name: String,
  description: {
    type: String,
    default: 'No description available.',
  },
  cols: Number,
  deck: [[cardSchema]],
  sideboard: [[cardSchema]],
};

// Deck schema
let deckSchema = mongoose.Schema({
  cube: {
    type: String,
    index: true,
  },
  date: {
    type: Date,
    index: true,
  },
  comments: {
    type: [Comment],
    default: [],
  },
  draft: {
    type: String,
    default: '',
  },
  cubename: {
    type: String,
    default: 'Cube',
  },

  //new format, will convert to
  seats: {
    type: [SeatDeck],
    default: [],
    index: true,
  },
  //deprecated
  owner: String,
  name: String,
  description: {
    type: String,
    default: 'No description available.',
  },
  username: {
    type: String,
    default: 'User',
  },
  cols: Number,
  playerdeck: {
    type: [[]],
    index: true,
  },
  playersideboard: [[]],
  bots: [[]],
  cards: [[]],
  newformat: {
    type: Boolean,
    default: false
  },
});

let Deck = (module.exports = mongoose.model('Deck', deckSchema));
