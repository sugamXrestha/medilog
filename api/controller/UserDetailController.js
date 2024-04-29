import UserDetail from "../models/UserDetails.js";

class UserDetailController{
  async index(req, res){
    const data = await UserDetail.find({}).populate("userCode phone");
    res.json(data);
  }
  async show(req, res){

  }
  async store(req, res) {
    try {
      console.log(req.body);
      const userData = new UserDetail({ ...req.body });
      const savedUserData = await userData.save();
      console.log("UserDetail inserted:", savedUserData);
      res.status(200).json({ message: "UserDetail inserted" });
    } catch (err) {
      console.error("Error saving UserDetail:", err);
      res.status(500).json({ error: err.message });
    }
  }

}

export default UserDetailController