export default {
  routes: [
    {
      method: "POST",
      path: "/email",
      handler: "emailer.send",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
