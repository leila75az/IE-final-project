const roundDB= require('../model/round');
const gameDB= require('../model/game');

const addRound = async (request, h) => {
  const newRound = request.payload;
  const foundGame = await gameDB.find({_id: newRound.gameID}).exec()

  if(foundUser.length === 0)
    return({status:"400"})
  var roundModel = new roundDB({...newRound, created_at: new Date(), updated_at: new Date(), score:0});

  const save = new Promise((resolve, reject) => {
    gameModel.save(function (err, craetedGame) {
      if (err) return resolve({status:"400"})
      return resolve({status:"200",craetedGame})
    });
  })
   return save
}

module.exports = addRound;

