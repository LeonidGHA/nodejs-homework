const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendGridMail = async (data) => {
  const mail = { ...data, from: "leonidsestrivatovskiy@gmail.com" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendGridMail;
