const gameDb = require('../model/game');

const addGame = async (request, h) => {
  const newGame = request.payload;

  var gameModel = new gameDb({...newGame, created_at: new Date(), updated_at: new Date(), score:0,
  queue:[]});

  const save = new Promise((resolve, reject) => {
    gameModel.save(function (err, craetedGame) {
      if (err) return resolve({status:"400"})
      return resolve({status:"200",craetedGame})
    });
  })
   return save
}

module.exports = addGame;

