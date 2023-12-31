module.exports = ({ env }) => ({
  //
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  // ...
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        // endpoint: env('AWS_ENDPOINT'), // e.g. "s3.fr-par.scw.cloud"
        params: {
          Bucket: env("AWS_BUCKET"),
        },
      },
    },
  },
  // ...
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 465),
        auth: {
          user: env("SMTP_USERNAME", "noreply.hariomenterprises@gmail.com"),
          pass: env("SMTP_PASSWORD", "lyibtilsivqvmpgd"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "noreply.hariomenterprises@gmail.com",
        defaultReplyTo: "noreply.hariomenterprises@gmail.com",
      },
    },
  },
});
