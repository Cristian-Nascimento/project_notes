const Router = require('express').Router
const db = require('../db/connection')
const { ObjectId } = require('mongodb')

const router = Router()

router.get('/', function (req, res) {
  res.render('notes/create')
})

router.get('/edit/:id', async function (req, res) {
  const id = new ObjectId(req.params.id)
  const note = await db.getDb()
    .db()
    .collection('notes')
    .findOne({ _id: id })

  res.render('notes/edit', { note })
})

router.get('/:id', async function (req, res) {
  const id = new ObjectId(req.params.id)
  const note = await db.getDb()
    .db()
    .collection('notes')
    .findOne({ _id: id })

  res.render('notes/detail', { note })
})

router.post('/', function (req, res) {
  const data = req.body;
  const title = data.title;
  const description = data.description;

  db.getDb()
    .db()
    .collection('notes')
    .insertOne({ title: title, description: description })
    .then(() => {
      res.redirect(301, '/')
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Internal Server Error')
    })
})

router.post('/update', function (req, res) {
  const data = req.body
  const id = new ObjectId(data.id)
  const title = data.title
  const description = data.description

  db.getDb()
    .db()
    .collection('notes')
    .updateOne({ _id: id }, { $set: { title: title, description: description } })
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Internal Server Error')
    })
})

router.post('/delete', function (req, res) {
  const data = req.body
  const id = new ObjectId(data.id)

  db.getDb()
    .db()
    .collection('notes')
    .deleteOne({ _id: id })
    .then(() => {
      res.redirect(301, '/')
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Internal Server Error')
    })
})

module.exports = router