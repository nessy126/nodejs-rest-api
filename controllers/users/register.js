const bcrypt = require("bcryptjs")
const { createError, sendMail } = require("../../helpers");
const { User } = require("../../models/User");
const gravatar = require('gravatar');
const { nanoid } = require("nanoid");
const { mail } = require("sendgrid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (user) {
    throw createError(409, "Email in use")
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const verificationToken = nanoid()
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken
  })
  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
      html: `<a target="_blank" href="http://localhost:3000/auth/verify/${verificationToken}">Нажмите для подтверждения регистрации</a>`
  }
  await sendMail(mail)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,

    }
  })
  
}

module.exports = register