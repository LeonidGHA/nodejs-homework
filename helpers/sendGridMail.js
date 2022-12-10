const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
const { SENDGRID_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendGridMail = async (data) => {
  const mail = { ...data, from: `${SENDGRID_EMAIL}@gmail.com` };
  await sgMail.send(mail);
  return true;
};

module.exports = sendGridMail;
