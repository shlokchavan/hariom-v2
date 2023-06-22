/**
 * A set of functions called "actions" for `emailer`
 */

import { adminMailBody } from "../../../../mail-template/admin-contact";
import { userMailBody } from "../../../../mail-template/user-contact";
// const ADMIN_EMAIL = "connect@hariomenterprises.info";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "connect@hariomenterprises.info";

export default {
  send: async (ctx, next) => {
    let options = ctx.request.body;
    strapi.log.debug(`Trying to send an email to ${options.email}`);
    try {
      // User Email
      const userMail = userMailBody.replace("$EMAIL$", options.email);

      const userMailOptions = {
        from: {
          name: "Hariom Enterprises",
          address: "noreply.hariomenterprises@gmail.com",
        },
        to: options.email, // list of receivers
        subject: "Welcome to, Hariom Enterprises!", // Subject line
        html: userMail, // plain text body
      };

      await strapi.plugins["email"].services.email.send(userMailOptions);
      strapi.log.debug(`Email sent to user -> ${options.email}`);

      // Admin Email
      // Admin Tempalate
      const adminMail = adminMailBody
        .replace("$FirstName$", options.firstName)
        .replace("$LastName$", options.lastName)
        .split("$Email$")
        .join(options.email)
        .split("$Mobile$")
        .join(options.mobile)
        .replace("$Message$", options.message);

      const adminMailOptions = {
        from: {
          name: "Hariom Enterprises",
          address: "noreply.hariomenterprises@gmail.com",
        },
        to: ADMIN_EMAIL, // list of receivers
        subject: "Ka-ching! A new business lead has just arrived from your website!", // Subject line
        html: adminMail, // plain text body
      };

      await strapi.plugins["email"].services.email.send(adminMailOptions);
      strapi.log.debug(`Email sent to admin -> ${ADMIN_EMAIL}`);

      ctx.send({ message: "Email sent successfully" });
    } catch (err) {
      strapi.log.error(`Error sending email to ${options.email}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
};
