import connectMongoDB from "@/dbConfig/mongodb";
import { throwUserResponse } from "@/utils";
import Admin from "../models/admin/admin.model";
// import jwt from "jsonwebtoken";

connectMongoDB();

export async function GET() {
    // const token = req.headers.get("authorization");

    // if (!token) {
    //     return throwUserResponse({
    //       status: 401,
    //       success: false,
    //       message: "Unauthorized",
    //     });
     //  }
     try {
       const allAdmins = await Admin.find().select('-password');
       return throwUserResponse({
        status: 200,
        success: true,
        message: "Successful",
        data: allAdmins,
      });
     }catch (error) {
        return throwUserResponse({
          status: 500,
          success: false,
          message: error?.message,
          errorStack: error,
        });
      }
} 
export const dynamic = "force-dynamic";