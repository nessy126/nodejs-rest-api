const { isValidObjectId } = require("mongoose");
const createError = require("./createError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createError(400, "Not id")
  }
  next()
}

module.exports = isValidId