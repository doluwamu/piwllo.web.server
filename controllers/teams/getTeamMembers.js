import Team from "../../models/teamModel.js";
import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

// Request type: GET
// To: /api/v1/teams/:teamId/members
// Desc: to get the members of a particular team
const getTeamMembers = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId).populate("members.user");
    const user = await User.findById(req.user._id);

    const isMember = team.members.find((member) => member.user.id === user.id);

    if (!isMember) {
      return next(new AppError("You are not a member of this team!", 402));
    }

    return res.json(team.members);
  } catch (error) {
    return next(error);
  }
};

export default getTeamMembers;
