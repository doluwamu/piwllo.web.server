import Team from "../../models/teamModel.js";
import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

const getUserTeams = async (req, res, next) => {
  try {
    const user = req.user;
    const t = [];
    const teams = (await Team.find({})).find(async (team) => {
      await team.populate("members.user");

      // console.log(team);

      const foundTeam = team.members.find((member) => member.id === user.id);

      if (!foundTeam) {
        return [];
      }

      console.log(team);
      return res.json(team);
    });

    return res.json("hello");
  } catch (error) {
    return next(error);
  }
};

export default getUserTeams;
