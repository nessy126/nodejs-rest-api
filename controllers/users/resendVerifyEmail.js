const { nanoid } = require("nanoid");
const { createError, sendMail } = require("../../helpers");
const { User } = require("../../models/User");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email })
  if (!user) {
    throw createError(404)
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed")
  }

  const { verificationToken } = user;
   const mail = {
     to: email,
     subject: "Подтверждение регистрации на сайте",
     html: `<a target="_blank" href="http://localhost:3000/auth/verify/${verificationToken}">Нажмите для подтверждения регистрации</a>`
   }
   await sendMail(mail)
   res.json({
     message: "Verification email sent"
   })
}

module.exports = resendVerifyEmail