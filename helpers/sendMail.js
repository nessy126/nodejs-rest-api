const sgMail = require('@sendgrid/mail')
require('dotenv').config()
const {
  SENDGRID_API_KEY
} = process.env
sgMail.setApiKey(SENDGRID_API_KEY)
const emailFrom = "nessy126@gmail.com"

const sendMail = async (data) => {
  try {
    const mail = {
      ...data,
      from: emailFrom
    }
    await sgMail.send(mail)

  } catch (error) {
       throw error;
  }
}

module.exports = sendMail