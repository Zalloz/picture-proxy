const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser')
const path = require('path')
const publicDirectory = path.join(__dirname, '../client')
const port = process.env.PORT || 80;
const axios = require('axios');

http.createServer(function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      let contentType = 'text/html';
      let extension = path.extname(req.url)
      if (extension === '.js') {
        contentType = 'text/javascript'
        hostJsOrCss()
      } else if (extension === '.css') {
        contentType = 'text/css'
        hostJsOrCss()
      } else {
        axios.get('http://ec2-3-133-91-213.us-east-2.compute.amazonaws.com').then(reactFormHtmlString => {
          reactFormHtmlString = reactFormHtmlString.data
          axios.get('http://ec2-3-17-68-94.us-east-2.compute.amazonaws.com/').then(reactPhotosHtmlString => {
            reactPhotosHtmlString = reactPhotosHtmlString.data
            res.writeHead(200, {
              'Content-Type': contentType,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "X-Requested-With"
            })
            const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <link href="http://localhost:8081/style.css" type="text/css" rel="stylesheet" />
                  <title>Zalloz</title>
                </head>
                <body>
                  <div id="photos">${reactPhotosHtmlString}</div>
                  <div id="form-service">${reactFormHtmlString}</div>
                </body>
                </html>
              `
            res.end(html, 'utf-8')
          })
        })
      }
      function hostJsOrCss() {
        fs.readFile(req.url === '/' ? publicDirectory + '/index.html' : publicDirectory + req.url, (err, content) => {
          res.writeHead(200, {
            'Content-Type': contentType,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
          })
          res.end(content, 'utf-8');
          return
        })
      }
    } else if (req.url === `/loaderio-3d2f0a07b3c6870f81ad0adf47c9b060/`) {
      let verifyPath = path.join(__dirname, `loaderio-3d2f0a07b3c6870f81ad0adf47c9b060/`)
      fs.readFile(verifyPath, (err, verifyFile) => {
        res.end('loaderio-3d2f0a07b3c6870f81ad0adf47c9b060', 'utf-8')
        return
      })
    }
  } else {
    res.write('Error!');
    res.end();
    return
  }
}).listen(80, function () {
});
