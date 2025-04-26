import connectMongoDB from "../../../dbConfig/mongodb";
import { throwUserResponse } from "../../../utils";
import generatePasswords from "../../../utils/generatePasswords"
import { IS_ADMIN_CONFIG } from "../email/config";
import { sendMailWithNM } from "../email/service";
import requiredReqBodyCheck from "../middleware/requiredReqBodyCheck";
import { registerAdminAutoRespEmailBody } from "./register.email";
import Admin from "../models/admin/admin.model"

connectMongoDB();

export async function POST(req) {
    try {
      const token = req.headers.get("authorization");
      if (!token) {
        return throwUserResponse({
          status: 401,
          success: false,
          message: "Unauthorized",
        });
      }    
        const reqBody = await req.json();

        const password = generatePasswords(10, {
             uppercase: true,
            numbers: true,
            specialChars: true,
        })

        const reqBodyCheck = requiredReqBodyCheck(reqBody, [
          "firstName",
          "lastName",
          "email",
          "role",
        ]);
    
        if (reqBodyCheck.status !== 200) {
          return reqBodyCheck;
        }
        const adminExists = await Admin.findOne({
            email: reqBody.email,
          });
          if (adminExists) {
            if (!adminExists.isVerified) {
              adminExists.password = password;
              const mailOptions = {
                from: process.env.FOS_SEND_MAIL_FROM,
                to: reqBody.email,
                subject: `Thank You for Registering on Direct Stars`,
                bcc: IS_ADMIN_CONFIG ? process.env.FOS_SEND_MAIL_FROM : undefined,
                html: registerAdminAutoRespEmailBody({
                  firstname: reqBody.firstName,
                  password: password,
                }),
                dsn: {
                  id: `${reqBody.firstName}-${reqBody.email}`,
                  return: "headers",
                  notify: ["failure", "delay"],
                  recipient: process.env.FOS_SEND_MAIL_FROM,
                },
              };
              await sendMailWithNM(mailOptions);
              await customerExists.save();
              return throwUserResponse({
                status: 400,
                success: true,
                message:
                  "User already exists. A new Password has been sent to your email.",
              });
            }
            if (customerExists.email === reqBody.email) {
              return throwUserResponse({
                status: 400,
                success: true,
                message: "You are already registered, please log in to proceed",
              });
            }
          }
          // let token;
          let userWithoutPassword;
          const newRegisterEntry = new Admin({
            ...reqBody,
            password: password,
          });
          const loggedResteredUser = await newRegisterEntry.save();

          const mailOptions = {
            from: process.env.FOS_SEND_MAIL_FROM,
            to: reqBody.email,
            subject: `Thank You for Registering on Direct Stars`,
            bcc: IS_ADMIN_CONFIG ? process.env.FOS_SEND_MAIL_FROM : undefined,
            html: registerAdminAutoRespEmailBody({
              firstname: reqBody.firstName,
              password: password,
            }),
            dsn: {
              id: `${reqBody.firstName}-${loggedResteredUser?._id}`,
              return: "headers",
              notify: ["failure", "delay"],
              recipient: process.env.FOS_SEND_MAIL_FROM,
            },
          };
          await sendMailWithNM(mailOptions);
          // token = await loggedResteredUser.generateAuthToken();
          userWithoutPassword = {
            _id: loggedResteredUser._id,
            id: loggedResteredUser._id,
            firstName: loggedResteredUser.firstname,
            lastName: loggedResteredUser.lastname,
            email: loggedResteredUser.email,
          };
          return throwUserResponse({
            status: 200,
            success: true,
            message: "Registration successful",
            data: {
              // token: token,
              user: userWithoutPassword,
            },
          });
      
    } catch (error) {
        return throwUserResponse({
          status: 500,
          success: false,
          message: error?.message,
          errorStack: error,
        });
      }
}

export const dynamic = "force-dynamic";