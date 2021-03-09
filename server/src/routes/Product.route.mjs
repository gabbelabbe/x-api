import ProductController from '../controllers/Product.controller.mjs'
import Middlewares from '../middlewares/Middlewares.mjs'

const routes = (app) => {
  app.get('/products', ProductController.getAllProducts)

  app.get('/product/search', ProductController.queryProduct)

  app.get('/product/:_id', ProductController.getOneProduct)

  app.post('/product', ProductController.createProduct)
  
  app.put('/product/quantity', ProductController.changeQuantity)
  
  app.put('/product/price', ProductController.changePrice)
  
  app.put('/product', Middlewares.isAdmin, ProductController.updateProduct)
  
  app.delete('/product', ProductController.deleteProduct)
}

export default {
  routes
}