import { transporter } from "../config.js";

const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error(e);
  }
};

export { sendMail };
