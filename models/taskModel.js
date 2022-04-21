import mongoose from "mongoose";
import { constants } from "../utils/constants.js";

const { TASK, USER } = constants;

const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: [true, "Please write in a task"],
      lowercase: true,
    },
    rank: {
      type: String,
      required: [true, "Please rank this task"],
      lowercase: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model(TASK, taskSchema);
export default Task;
