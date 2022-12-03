const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendGridMail = async (data) => {
  const mail = { ...data, from: "Stowk@ukr.net" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendGridMail;
