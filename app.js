const port    = 8080
const fs      = require("fs")
const express = require('express')
const app     = express()

// STATIC CONTENT
app.use(express.static("public"))

app.get('/api/hello', function (req, res) {
  res.send('Hello World')
})

app.get('/api/task/:id', function (req, res) {
  res.send('Here we to list all tasks')
  console.log(req.params.id)
})

app.all('api/*', function (req, res) {
  res.send('404 | Page not found')
})

app.all('*', function (req, res) {
  try {
    let target = `${__dirname}/public${req.url}.html`
    if (fs.existsSync(target)) {
      res.sendFile(target)
    } else {
      res.sendFile(__dirname + `/public/404.html`)
    }
  } catch (e) {
    res.sendFile(__dirname + `/public/500.html`)
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

