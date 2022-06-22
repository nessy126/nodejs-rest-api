const {createError} = require('../../helpers');
const {
  Contact
} = require('../../models/Contact')

const delContact = async (req, res) => {
  const {
    contactId
  } = req.params;

  const deletedContact = await Contact.findByIdAndRemove(contactId)
  if (!deletedContact) {
    throw createError(404)
  }

  res.json({
    "message": "contact deleted"
  })
}

module.exports = delContact;