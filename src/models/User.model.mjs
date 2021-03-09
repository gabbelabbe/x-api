import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    allowNull: false,
    required: true,
  },
  password: {
    type: String,
    allowNull: false,
    required: true
  },
  email: {
    type: String,
    allowNull: false,
    required: true
  },
  address: {
    type: String,
    allowNull: true
  },
  userType: {
    type: String,
    allowNull: false,
    required: true
  }
}, { timestamps: true })

const UserModel = model('user', userSchema)
export default UserModel