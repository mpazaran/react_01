const path     = require('path');
const fs       = require("fs")
const express  = require('express')
const app      = express()
const {create} = require("express-handlebars");
const dotenv   = require("dotenv")
/**
 * INITIALIZE ENV VARS
 */
dotenv.config()

/**
 * SET HBS ENGINE
 */
const hbs = create(
  {
    extname: ".hbs"
  }
).engine
app.engine('hbs', hbs);
app.set('view engine', 'hbs');

/**
 * DEFINE STATIC CONTENT DIR
 */
app.use(express.static("public"))

/**
 * API ENDPOINTS
 */
app.get('/api/hello', function (req, res) {
  res.send('Hello World')
})

app.get('/api/task/:id', function (req, res) {
  res.send('Here we to list all tasks')
})

app.all('api/*', function (req, res) {
  res.send('404 | Page not found')
})

/**
 * STATIC CONTENT REDERING
 */
app.all('*', function (req, res) {
  try {
    let url = req.url.replace(/^\/(.*)(\/*)$/g, "$1")
    if (url === "") {
      res.render("home")
    } else {
      let target = `${__dirname}/views/${url}.hbs`
      if (fs.existsSync(target)) {
        res.render(url)
      } else {
        res.render("404")
      }
    }
  } catch (e) {
    console.log(e.message)
    res.render("500")
  }
})

/**
 * START PROCESS
 */
app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
