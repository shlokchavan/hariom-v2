/**
 * address service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::address.address",
  ({ strapi }) => ({
    // Method 1: Creating an entirely custom service
    async sendMail(...args) {
      console.log("Custom Send Mail");
      console.log(args);

      let response = { okay: true };

      if (response.okay === false) {
        return { response, error: true };
      }

      return response;
    },
  })
);
