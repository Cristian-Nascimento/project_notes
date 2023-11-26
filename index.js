// Configurações
require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express()
const port = 8000

// DB
const db = require('./db/connection')

// Template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Importações de rotas
const notesRoutes = require('./routes/notes')

// Rotas
app.get('/', async function (req, res) {
  const notes = await db.getDb().db().collection('notes').find({}).toArray()
  res.render('home', { notes })
})

app.use('/notes', notesRoutes)

db.initDb((err, db) => {
  if (err) console.log(err)
  else {
    console.log("Conectado com sucesso")
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`)
    })
  }
})