const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");

const SENDER = 'onlineshop123@example.com'

const transporter = nodemailer.createTransport(
  new Transport({ apiKey: process.env.SEND_IN_BLUE_API_KEY })
);

const sendMail = ({to, subject, html}) => {
  return new Promise((resolve, reject) => {
    if (process.env.EMAILS_IN_CONSOLE !== 'true') {
      transporter.sendMail({
        from: SENDER, to, subject, html
      }, function (error) {
        if (!error) {
          console.log(`Mail with subject ${subject} has been sent successfully`)
          resolve()
        }
        else {
          console.log(`Error during sending mail with subject ${subject}, ${error}`)
          reject()
        }
      })
    }

    else {
      console.log(`From: ${SENDER}`, '\n', `To: ${to}`, '\n', `Subject: ${subject}`, '\n', `Html: ${html}`)
      resolve()
    }
  })
}

module.exports = sendMail
