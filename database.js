let mongoose = require('mongoose');
const server = 'mongodb+srv://admin:admin@cluster0-3kfjh.mongodb.net/IE'; // REPLACE WITH YOUR DB SERVER
const database = 'IE';      // REPLACE WITH YOUR DB NAME
class Database {
  constructor() {
    this._connect()
  }
  _connect() {
    mongoose.connect(server)
      .then((db) => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error',err)
      })
  }
}
module.exports = new Database()
