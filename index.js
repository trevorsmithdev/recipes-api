const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./authorization/routes.config')
const recipesRouter = require('./recipes/routes.config')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Apply Middlewares
app.use(bodyParser.json())
app.use(cookieParser())

// Routes
authRouter.routesConfig(app)
recipesRouter.routesConfig(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})