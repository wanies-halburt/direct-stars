import connectMongoDB from "../../../dbConfig/mongodb";
import { throwUserResponse } from "../../../utils";
import Subject from "../models/subject/subject.model";
import { URL } from "url";

connectMongoDB();

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    if (id) {
      const existingSubject = await Subject.findById(id).populate("createdBy");
      if (!existingSubject) {
        return throwUserResponse({
          status: 404,
          success: false,
          message: "Subject not found",
        });
      } else {
        return throwUserResponse({
          status: 200,
          success: true,
          message: "Successful",
          data: existingSubject,
        });
      }
    } else {
      const subjects = await Subject.find();
      return throwUserResponse({
        status: 200,
        success: true,
        message: "successful",
        data: subjects,
      });
    }
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
