const gameDb = require('../model/game');

const getGames = async (request, h) => {

  const games = await gameDb.find({}).exec()
  // console.log(foundUser)
  return {"status": "200", games}
}

module.exports = getGames;

