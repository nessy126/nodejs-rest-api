const {
   Contact
} = require('../../models/Contact')
const {createError} = require('../../helpers')

const updateById = async (req, res, next) => {
 const {
   contactId
 } = req.params;

 const updateContact = await Contact.findByIdAndUpdate(contactId, req.body)
 if (!updateContact) {
   throw createError(404)
 }
 res.json(updateContact)
}

module.exports = updateById;