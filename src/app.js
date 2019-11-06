const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 80;
const axios = require('axios');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.get("/loaderio-3d2f0a07b3c6870f81ad0adf47c9b060", (req, res) => {
  res.end("loaderio-3d2f0a07b3c6870f81ad0adf47c9b060")
})
app.use(express.static(path.join(__dirname, '../client')));
app.get("/", (req, res) => {
  axios.get('http://ec2-3-133-91-213.us-east-2.compute.amazonaws.com')
    .then(reactString => {
      axios.get('http://ec2-3-17-68-94.us-east-2.compute.amazonaws.com')
        .then(formString => {
          const html =
            `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Zallo Proxy</title>
        <link rel="shortcut icon" href="https://s3-us-west-2.amazonaws.com/agents-zallo/logo.jpg" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" media="screen and (min-width:700px)" href="http://localhost:8080/defaultStyle.css">
        <link rel="stylesheet" type="text/css" media="screen and (man-width: 480px) and (max-width:1250px)" href="http://localhost:8080/sizeDownOne.css">
        <link rel="stylesheet" type="text/css" media="screen and (man-width: 480px) and (max-width:1250px)" href="http://localhost:8082/style.css">
        <link rel="stylesheet" type="text/css" media="screen and (man-width: 480px) and (max-width:1250px)" href="http://localhost:8081/style.css">
      </head>
      <body>
        <div class="container">
          <div id="photos">${reactString.data}</div>
          <div id="gendesc"></div>
          <div id="form-service">${formString.data}</div>
          <div id="similar-homes"></div>
        </div>
      </body>
      </html>`
          res.send(html);
        })

    })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
