const { createError } = require("../../helpers");
const {
  Contact
} = require("../../models/Contact");

const updateFavorite = async (req, res) => {
  const {
    contactId
  } = req.params;
  console.log(req.body);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

  if (!result) {
    throw createError(404)
  }
  console.log(result);
  res.json(result);
}

module.exports = updateFavorite;