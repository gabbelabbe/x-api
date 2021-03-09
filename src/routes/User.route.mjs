import UserController from '../controllers/User.controller.mjs'
import Middlewares from '../middlewares/Middlewares.mjs'

const routes = (app) => {
  app.post('/user/create', UserController.createUser)

  app.post('/user/login', UserController.loginUser)

  app.get('/users', UserController.getAllUsers)

  app.delete('/user', UserController.deleteUser)

  app.put('/user/change/password', UserController.changePwd)

  app.put('/user/change/type', Middlewares.isAdmin, UserController.updateUserType)
}

export default {
  routes
}