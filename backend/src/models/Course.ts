import { Schema, model } from "mongoose";
import { Course } from "../types/PersonaTypes";

const CourseSchema = new Schema<Course>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

const CourseModel = model("course", CourseSchema);
export default CourseModel;
