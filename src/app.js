const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const proxy = require('http-proxy-middleware');
const { routes } = require('./config.json');
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json())


for (route of routes) {
  app.use(route.route,
    proxy({
      target: route.address,
      pathRewrite: (path, req) => {
        return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
      }
    })
  );
}


module.exports = app;