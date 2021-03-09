import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import Middlewares from  './src/middlewares/Middlewares.mjs'
import Configurations from  './configurations/Configurations.mjs'
import UserRoutes from  './src/routes/User.route.mjs'
import ProductRoutes from  './src/routes/Product.route.mjs'
import CartRoute from  './src/routes/Cart.route.mjs'

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
ProductRoutes.routes(app)
CartRoute.routes(app)

// Error handlers
app.use(Middlewares.notFound)
app.use(Middlewares.errHandler)

// Connect to mongo and start server
Configurations.connectToDb()
Configurations.connectToPort(app)

export default app