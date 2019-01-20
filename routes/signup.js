const user = require('../user');

const signup = (request, h) => {
  const newUser = request.payload;
  if (!newUser.username || !newUser.lname || !newUser.fname || !newUser.password || !newUser.gender | !newUser.birthday)
    return {"status": "400"}

  var userModel = new user({...newUser});
  userModel.save(function (err, createdUser) {
    if (err) return  {"status": "500"}
  });
  return {"status": "200"}
}

module.exports = signup;

