import mongoose from 'mongoose'
const { Schema, model } = mongoose

const cartSchema = Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId, 
        ref: 'product'
      },
      quantity: {
        type: Number,
        min: 0
      }
    }
  ]
}, { timestamps: true })

const CartModel = model('cart', cartSchema)
export default CartModel