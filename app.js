const express = require('express')
const fs = require('fs/promises')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/api')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.use('/users', router.register)
app.use('/api/contacts', router.contacts)
app.use('/avatars', router.avatars)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = app
