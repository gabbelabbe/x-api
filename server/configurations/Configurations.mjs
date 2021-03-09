import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectToDb = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    console.log('connected to db')
  } catch (err) {
    console.error('error occured when connecting to db: ' + err)
    process.exit()
  }
}

const connectToPort = (app) => {
  app.listen(process.env.PORT, () => {
    console.log('listening on port ' + 3001)
  })
}

export default {
  connectToDb,
  connectToPort
}