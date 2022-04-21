import Team from "../../models/teamModel.js";

// Request type: GET
// To: /api/v1/teams/all
// Desc: to get all teams from the DB(Admins only)
const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find({});
    return res.json(teams);
  } catch (error) {
    return next(error);
  }
};

export default getTeams;
