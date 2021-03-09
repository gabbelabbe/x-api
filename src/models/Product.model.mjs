import mongoose from 'mongoose'
const { Schema, model } = mongoose

const productSchema = Schema({
  name: {
    type: String,
    unique: true,
    allowNull: false,
    required: true,
  },
  types: {
    type: [String],
    allowNull: false,
    required: true
  },
  price: {
    type: Number,
    allowNull: false,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    allowNull: false,
    required: true,
    min: 0
  }
}, { timestamps: true })

const ProductModel = model('product', productSchema)
export default ProductModel