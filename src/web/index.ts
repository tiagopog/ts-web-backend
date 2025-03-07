import express from 'express'
import { buildRoutes } from './routes/'

const port = 3000

let app = express()
app = buildRoutes(app)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
