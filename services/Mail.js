const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");

const transporter = nodemailer.createTransport(
  new Transport({ apiKey: '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' })
);

module.exports = transporter
