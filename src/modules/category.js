import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 100,
    },
  },
  {
    timestamps: true,
  },
);

export const Category = mongoose.model("category", categorySchema);
