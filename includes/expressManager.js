import express from 'express'
import bodyParser from 'body-parser'

export function startExpress() {
  const app = express()
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
  })
  app.use(express.static('templates'))
  app.use(bodyParser.json())
  app.listen(5000)
  return app
}
