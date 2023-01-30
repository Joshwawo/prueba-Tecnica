import { Schema, model } from "mongoose";
import { calif } from "../types/PersonaTypes";

const califSchema = new Schema<calif>(
  {
    califPractice: {
      type: Number,
      trim: true,
    },
    califPartial: {
      type: Number,
      trim: true,
    },
    califGrading: {
      type: Number,
      trim: true,
    },
    finalAverage: {
      type: Number,
      trim: true,
    },
    studen: {
      type: Schema.Types.ObjectId,
      ref: "studen",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
  },
  {
    timestamps: true,
  }
);

const califModel = model("calif", califSchema);
export default califModel;
