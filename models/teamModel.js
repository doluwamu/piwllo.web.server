import mongoose from "mongoose";
import { constants } from "../utils/constants.js";
import { memberSchema } from "./teamMemberModel.js";

const { USER, TEAM } = constants;

const { Schema, model } = mongoose;

const teamSchema = new Schema(
  {
    teamname: {
      type: String,
      required: [true, "Please provide a name for your team"],
    },
    creator: memberSchema,
    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

const Team = model(TEAM, teamSchema);

export default Team;
