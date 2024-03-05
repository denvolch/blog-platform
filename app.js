const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(config.MONGODB_URI)
console.log(process.env.NODE_ENV)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app