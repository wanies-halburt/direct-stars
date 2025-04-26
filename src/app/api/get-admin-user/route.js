import connectMongoDB from "@/dbConfig/mongodb";
import { throwUserResponse } from "@/utils";
import Admin from "../models/admin/admin.model";
import jwt from "jsonwebtoken";

connectMongoDB();

export async function GET(req) {
  const token = req.headers.get("authorization");

  if (!token) {
    return throwUserResponse({
      status: 401,
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, "admin_secret");
    const userId = decoded._id;
    const user = await Admin.findById(userId).select("-password -tokens");

    if (!user) {
      return throwUserResponse({
        status: 401,
        success: false,
        message: "User not found",
      });
    }

    return throwUserResponse({
      status: 200,
      success: true,
      message: "Successful",
      data: user,
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
