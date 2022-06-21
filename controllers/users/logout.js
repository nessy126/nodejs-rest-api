const { User } = require("../../models/User")

const logout = async (req, res) => {

  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, {token: ""})
  res.status(204).send()
}

module.exports = logout