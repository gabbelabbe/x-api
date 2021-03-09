import CartController from '../controllers/Cart.controller.mjs'

const routes = (app) => {
  app.get('/carts', CartController.getAllCarts)

  app.get('/cart/:_id', CartController.getCart)

  app.post('/cart', CartController.createCart)
  
  app.put('/cart/update', CartController.updateCartProducts)
    
  app.delete('/cart', CartController.deleteCart)
}

export default {
  routes
}