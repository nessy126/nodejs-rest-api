const { User } = require("../../models/User");

const current = async (req, res) => {
  // const { _id: id } = req.user;
  // const user = await User.
    res.json({
      email: req.user.email,
      subscription: req.user.subscription,
  })
}

module.exports = current