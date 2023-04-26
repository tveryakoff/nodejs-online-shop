const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");


const transporter = nodemailer.createTransport(
  new Transport({ apiKey: process.env.SEND_IN_BLUE_API_KEY })
);

module.exports = transporter
