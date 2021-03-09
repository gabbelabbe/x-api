const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const Middlewares = require( './src/middlewares/Middlewares.js')
const Configurations = require( './configurations/Configurations.js')
const UserRoutes = require( './src/routes/User.route.js')
//const ProductRoutes = require( './src/routes/Product.route.js')
//const CartRoute = require( './src/routes/Cart.route.js')

// Config server
const app = express()
app.use(helmet())
app.use(morgan('common'))
app.use(express.json())
const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL, // Update to application url on launch
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// Routes
UserRoutes.routes(app)
//ProductRoutes.routes(app)
//CartRoute.routes(app)

// Error handlers
app.use(Middlewares.notFound)
app.use(Middlewares.errHandler)

// Connect to mongo and start server
Configurations.connectToDb()
Configurations.connectToPort(app)

module.exports = app