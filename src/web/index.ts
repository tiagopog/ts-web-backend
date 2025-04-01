import express from 'express'
import bodyParser from 'body-parser'
import { buildRoutes } from './routes/'

let app = express()

// Use json as the default body parser (with support to json:api)
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// Route requests to endpoints
app = buildRoutes(app)

const shouldStartServer = process.env.START_SERVER !== 'false'

if (shouldStartServer) {
  // TCP port for the web server
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
