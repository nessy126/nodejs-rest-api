const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { createError } = require("../../helpers");
const { User } = require("../../models/User");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  
  if (!user) {
    throw createError(401, "message: Email is wrong")
  }
  const comparePassword = await bcrypt.compare(password, user.password)

  if (!comparePassword) {
    throw createError(401, "message: Password is wrong")
  }
  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, SECRET_KEY)
  console.log(token);
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token,
    user: {
      email: user.email,
     subscription: user.subscription
    }
  })



  

}

module.exports = login