import connectMongoDB from "@/dbConfig/mongodb";
import { throwUserResponse } from "@/utils";
import requiredReqBodyCheck from "../middleware/requiredReqBodyCheck";
import Admin from "../models/admin/admin.model";

connectMongoDB();

export async function POST(req) {
    try {
        const reqBody = await req.json();

        const reqBodyCheck = requiredReqBodyCheck(reqBody, ["email", "password"]);
        if (reqBodyCheck.status !== 200) {
            return reqBodyCheck;
          }
      
          const user = await Admin.findByCredentials(
            reqBody.email,
            reqBody.password
          );
          if (!user) {
            return throwUserResponse({
              status: 400,
              success: false,
              message: "Login failed! Check authenthication credentails",
            });
          }
          let userWithoutPassword;
          await user.save();
          const token = await user.generateAuthToken();
      
          userWithoutPassword = {
            _id: user._id,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
          };
          return throwUserResponse({
            status: 200,
            success: true,
            message: "Login success",
            data: {
              token: token,
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
};

export const dynamic = "force-dynamic";