export const IS_ADMIN_CONFIG = !!process.env.IS_ADMIN;

// export const NODE_MAILDER_CONFIG_OPTIONS_ADMIN = {
//   host: process.env.FOS_SEND_MAIL_HOST,
//   port: process.env.FOS_SEND_MAIL_PORT,
//   secure: true, // use TLS
//   auth: {
//     user: process.env.FOS_SEND_MAIL_FROM,
//     pass: process.env.FOS_SEND_MAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: true,
//     minVersion: "TLSv1.2",
//   },
//   dkim: {
//     domainName: process.env.FOS_DOMAIN_NAME,
//     keySelector: "2023",
//     privateKey: process.env.FOS_DKIM_PRIVATE_KEY,
//   },
//   logger: true,
//   debugger: process.env.NODE_ENV !== "production",
// };

export const NODE_MAILDER_CONFIG_OPTIONS = {
  name: "hostgator",
  host: "mail.wanieshalburt.com",
  port: 465,
  secure: true,
  requireTLS: false,
  auth: {
    user: process.env.FOS_SEND_MAIL_FROM,
    pass: process.env.FOS_SEND_MAIL_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
  from: process.env.FOS_SEND_MAIL_FROM,
};
