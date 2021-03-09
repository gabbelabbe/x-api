import CartModel from '../models/Cart.model.js'

const createCart = async (req, res) => {
  const cart = new CartModel({
    userID: req.body.userID,
    products: [{product: req.body.productID, quantity: req.body.quantity}]
  })

  try {
    const dbRes = await cart.save()
    res.status(201).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to create cart.',
      stack: err
    })
  }
}

const getAllCarts = async (req, res) => {
  try {
    const dbRes = await CartModel.find({})
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to get carts.',
      stack: err
    })
  }
}

const getCart = async (req, res) => {
  try {
    const dbRes = await CartModel.findById(req.params._id)
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to get cart.',
      stack: err
    })
  }
}

const deleteCart = async (req, res) => {
  try {
    const dbRes = await CartModel.findByIdAndDelete(req.body._id)
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to delete cart.',
      stack: err
    })
  }
}

const updateCartProducts = async (req, res) => {
  try {
    const cart = await CartModel.findById(req.body._id)

    if (cart) {
      const itemIndex = cart.products.findIndex(p => p.product == req.body.productID)

      if (itemIndex > -1) {
        if (req.body.quantity === 0) {
          cart.products.splice(itemIndex, 1)
        } else {
          const productItem = cart.products[itemIndex]
          productItem.quantity = req.body.quantity
          cart.products[itemIndex] = productItem
        }
      } else {
        cart.products.push({product: req.body.productID, quantity: req.body.quantity})
      }

      const dbRes = await cart.save()
      return res.status(200).send(dbRes)
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{product: req.body.productID, quantity: req.body.quantity}]
      })

      return res.status(201).send(newCart)
    }
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to update cart.',
      stack: err
    })
  }
}

export default {
  createCart,
  deleteCart,
  getAllCarts,
  getCart,
  updateCartProducts
}