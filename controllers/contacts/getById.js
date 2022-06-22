const {createError} = require('../../helpers');
const {
  Contact
} = require('../../models/Contact')

const getById = async (req, res) => {
  const {
    contactId
  } = req.params;
  const contact = await Contact.findById(contactId, "-__v")

  if (!contact) {
    throw createError(404)
  }
  res.json(contact)
}

module.exports = getById;