const dotenv = require('dotenv')

dotenv.config()

const notFound = (req, res, next) => {
  const error = new Error('invalid URL - NOT FOUND ' + req.originalUrl)
  res.status(404)
  next(error)
}

const errHandler = (error, req, res, next) => {
  const statusCode = res.statusCode.toString()[0] === '2' || res.statusCode.toString()[0] === '3' ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    statusCode: statusCode,
    msg: error.message,
    stackTrace: process.env.ENVIROMENT === 'dev' ? error.stack : null
  })
}

const isAdmin = (req, res, next) => {
  if (req.body.userType === 'admin') {
    next()
  } else {
    res.status(401).send('You are not admin >:(')
  }
}

module.exports = {
  notFound,
  errHandler,
  isAdmin
}