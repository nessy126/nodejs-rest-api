const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const subscriptions = ['starter', 'pro', 'business']

const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: "starter"
    },
    token: {
      type: String,
      default: null,
  },
    avatarURL: String,
})
  
const User = model("user", userSchema)

const registerUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
})

const loginUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
})

const schemas = {
  registerUser,
  loginUser,
  }

module.exports = {
  User,
  schemas
}