const {createError} = require('../helpers')

const validation = (schema) => {
  const func = (req, res, next) => {
    try {
      const { error } = schema.validate(req.body)
      if (error) {
        const err = createError(400, error.message)
        throw err;
      }
      next()
    } catch (error) {

      next(error)
    }
  }
  return func;
}

module.exports = validation