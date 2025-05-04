import connectMongoDB from "../../../dbConfig/mongodb";
import { throwUserResponse } from "../../../utils";
import requiredReqBodyCheck from "../middleware/requiredReqBodyCheck";
import Subject from "../models/subject/subject.model";

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

    const reqBodyCheck = requiredReqBodyCheck(reqBody, [
      "title",
      "code",
      "description",
      "createdBy",
    ]);
    if (reqBodyCheck.status !== 200) {
      return reqBodyCheck;
    }
    const newSubject = new Subject({
      title: reqBody.title,
      code: reqBody.code,
      description: reqBody.description,
      createdBy: reqBody.createdBy,
    });
    await newSubject.save();
    return throwUserResponse({
      status: 200,
      success: true,
      message: "Subject Created successfully",
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
