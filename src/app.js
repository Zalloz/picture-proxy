const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json())

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


module.exports = app;