import { Schema, model } from "mongoose";
import { Curse } from "../types/PersonaTypes";

const CourseSchema = new Schema<Curse>(
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
