const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 8080;
const axios = require('axios');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../client')));
app.get("/", (req, res) => {
  axios.get('http://localhost:8082')
    .then(reactString => {
      console.log(reactString)
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
        <!-- <link rel="stylesheet" type="text/css" media="screen and (man-width: 480px) and (max-width:1250px)" href="http://localhost:8081/style.css"> -->
      </head>
      <body>
        <div class="container">
          <div id="photos">${reactString.data}</div>
          <div id="gendesc"></div>
          <div id="form-service"></div>
          <div id="similar-homes"></div>
        </div>
      </body>
  </html>`
      res.send(html);
    })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
