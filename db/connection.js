const { MongoClient } = require('mongodb')

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@projects.ooxasaw.mongodb.net/Notes?retryWrites=true&w=majority`

let _db

const initDb = cb => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      _db = client
      cb(null, _db)
    })
    .catch(error => {
      cb(error)
    })
}

const getDb = () => {
  return _db
}

module.exports = {
  initDb,
  getDb
}