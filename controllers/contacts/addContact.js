const {
  Contact
} = require('../../models/Contact')

const addContact = async (req, res) => {
  console.log(req.body);
  const addedContact = await Contact.create(req.body)
  res.status(201).json(addedContact)
  
}

module.exports = addContact;