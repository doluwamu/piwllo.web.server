import mongoose from "mongoose";
import validator from "validator";

import { constants } from "../utils/constants.js";

const { USER, TEAM } = constants;

const { Schema } = mongoose;

export const memberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    isTeamAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
