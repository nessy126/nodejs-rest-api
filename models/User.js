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
  verify: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required']
  }
}, { versionKey: false, timestamps: true })
  
const User = model("user", userSchema)

const registerUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
})

const loginUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
})

const verifyEmail = {
  email: Joi.string().pattern(emailRegexp).required()
}

const schemas = {
  registerUser,
  loginUser,
  verifyEmail
  }

module.exports = {
  User,
  schemas
}