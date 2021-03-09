const UserController = require('../controllers/User.controller.js')
const Middlewares = require('../middlewares/Middlewares.js')

const routes = (app) => {
  app.post('/user/create', UserController.createUser)

  app.post('/user/login', UserController.loginUser)

  app.get('/users', UserController.getAllUsers)

  app.delete('/user', UserController.deleteUser)

  app.put('/user/change/password', UserController.changePwd)

  app.put('/user/change/type', Middlewares.isAdmin, UserController.updateUserType)
}

module.exports = {
  routes
}