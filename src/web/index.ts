import express from 'express'
import bodyParser from 'body-parser'
import { buildRoutes } from './middlewares/route_middleware'
import cors from 'cors'
import { handlerError } from './middlewares/error_middleware'

let app = express()

// Enable CORS for any origin in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(cors())
}

// Use json as the default body parser (with support to json:api)
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// Route requests to endpoints
app = buildRoutes(app)

// Error handler
app = handlerError(app)

const shouldStartServer = process.env.START_SERVER !== 'false'

if (shouldStartServer) {
  // TCP port for the web server
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    console.log(`Environment: ${process.env.NODE_ENV}`)
  })
}
