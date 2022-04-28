const express = require('express')
const { default: mongoose } = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const projectRoutes = require('./product')
const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/CEAssignment2022Database"

app.use(bodyParser.json())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use('/project/', projectRoutes)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected Successfull....'))
.catch((err) => console.log('Error Connecting to MongoDB. Error: ', err))

app.listen(PORT, (error) => {
    if (error) return console.log('Error listening for server on port');
    console.log(`Listening on Port ${PORT}`)
})