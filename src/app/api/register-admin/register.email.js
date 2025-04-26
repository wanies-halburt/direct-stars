import path from "path";
import { parseHtmlFile } from "../email/templates";

export const registerAdminAutoRespEmailBody = ({ firstname, password }) => {
  const variable = [
    {
      variable: "FIRST_NAME",
      value: firstname,
    },
    {
      variable: "FOS_EMAIL",
      value: process.env.FOS_SALES_MAIL,
    },
    {
      variable: "FOS_PASSWORD",
      value: password ?? "",
    },
    {
      variable: "PASSWORD_LINK",
      value:
        `${process.env.BASE_SITE_URL}admin-login` ??
        "http://localhost:3000/signin",
    },
  ];
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "email",
    "templates",
    "register_admin_resp.html"
  );
  const mailBody = parseHtmlFile(filePath, variable);

  return mailBody;
};
