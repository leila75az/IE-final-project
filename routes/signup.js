const user = require('../model/user');

const signup = (request, h) => {
  const newUser = request.payload;
  if (!newUser.username || !newUser.lname || !newUser.fname || !newUser.password || !newUser.gender | !newUser.birthday)
    return {"status": "400"}

  var userModel = new user({...newUser,created_at:new Date(),updated_at:new Date()});
  const save = new Promise((resolve, reject) => {
    userModel.save(function (err, createdUser) {
      if (err) return reject(err)
      return resolve(createdUser)
    });
  })
  return save;
}

module.exports = signup;

