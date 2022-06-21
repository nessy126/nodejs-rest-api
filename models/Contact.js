const {
  Schema,
  model
} = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const add = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }).required(),
  phone: Joi.required(),
  favorite: Joi.boolean().default(false).required()
})

const updateFavorite = Joi.object({
  favorite: Joi.boolean().default(false).required()
})

const schemas = {
  add,
  updateFavorite
}

const Contact = model("contact", contactSchema)

module.exports = {
  schemas,
  Contact
}