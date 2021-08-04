let mongoose = require('mongoose');
const { DB_URL } = require('./Constants')

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      console.log('Database connection successful')
    }).catch(err => {
      console.error('Database connection error')
    })
  }
}

module.exports = new Database()