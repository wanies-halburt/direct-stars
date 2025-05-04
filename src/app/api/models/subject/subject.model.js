import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    code: {
      type: String,
      required: [true, "Please provide a code"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
  },
  { timestamps: true }
);

const Subject =
  mongoose.models.subjects || mongoose.model("subjects", SubjectSchema);

export default Subject;
