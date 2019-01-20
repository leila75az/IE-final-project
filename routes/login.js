const userDB = require('../user');

const login = async (request, h) => {
  const requestedUser = h.request.auth.credentials
  const foundUser = await userDB.find({username: requestedUser.id}).exec()
  // console.log(foundUser)

  if (foundUser.length === 0)
    return {status: "401", "message": "user not found"}

  if (foundUser[0].password === requestedUser.password)
    return {"status": "200", "token": "1234"}
  else
    return {status: "403"}
}

module.exports = login;

