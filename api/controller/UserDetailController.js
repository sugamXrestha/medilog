import UserDetail from "../models/UserDetails.js";
// import User from "../models/User.js";

class UserDetailController {
  async index(req, res) {
    try {
      const data = await UserDetail.find()
      .populate({
        path: "userId"
      })
      .populate({
        path: "perCity",
        populate:{
          path: "district",
          populate:{
            path: "state"
          }
        }
      })
      .populate({
        path: "tempCity",
        populate:{
          path: "district",
          populate:{
            path: "state"
          }
        }
      })
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async show(req, res) {
    try{
      const id = req.params.id;
      const data = await UserDetail.find({userId: id})
      .populate({
        path: "userId",
      })
      .populate({
        path: "tempCity",
        populate:{
          path: "district",
          populate:{
            path: "state"
          }
        }
      })
      res.json(data);
    } catch (error) {
      console.error("Error fetching Specific record details:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async store(req, res) {
    try {
      const userData = new UserDetail({ ...req.body });
      const savedUserDetail = await userData.save();
      console.log("UserDetail inserted:", savedUserDetail);
      res.status(200).json({ message: "UserDetail inserted" });  
    } catch (err) {
      console.error("Error saving UserDetail:", err);
      res.status(500).json({ error: err.message });
    }
  }

  async getUserDetail(req, res){
    const id = req.params.id
      const data = await UserDetail.find({user: id});
      res.json(data);
  }
}

export default UserDetailController;
