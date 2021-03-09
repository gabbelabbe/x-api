const UserModel = require('../models/User.model.js')
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    userType: 'customer'
  })

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  try {
    const dbRes = await user.save()
    const serverUser = await UserModel.findById(dbRes._id, 'username email address userType') 
    res.status(201).send(serverUser)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to create user.',
      stack: err
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const dbRes = await UserModel.find({}, 'username email address userType')
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to get users.',
      stack: err
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const dbRes = await UserModel.findByIdAndDelete(req.body._id)
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to delete user.',
      stack: err
    })
  }
}

const changePwd = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const newPwd = await bcrypt.hash(req.body.password, salt)

    const dbRes = await UserModel.updateOne({ _id: req.body._id }, { password: newPwd })
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to update password.',
      stack: err
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username}, 'username email address password')
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (validPassword) {
      const signedInUser = await UserModel.findById(user._id, 'username email address userType')
      res.status(200).send(signedInUser)
    } else {
      res.status(400).send({msg: 'Incorrect password or username'})
    }
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to log you in.',
      stack: err
    })
  }
}

const updateUserType = async (req, res) => {
  try {
    const dbRes = await UserModel.updateOne({ _id: req.body._id }, { userType: req.body.newUserType })
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to update password.',
      stack: err
    })
  }
}

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  changePwd,
  loginUser,
  updateUserType
}