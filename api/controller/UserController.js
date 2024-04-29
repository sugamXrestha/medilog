import User from "../models/User.js";

class UserController{
    async index(req, res){
        const data = await User.find({});
        res.json(data);
    }
    async show(req, res){

    }

    async store(req, res){
        try {
          console.log(req.body)
          const user = new User({...req.body});
          await user.save();
            // await User.create({...req.body.data})           
            res.status(200).json({message:"User was inserted"})
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }
    async update(req, res){

    }
    async destroy(req, res){
      try {
        const id = req.params.id;
        // const user = await User.findById(id);
        await User.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "User deleted successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error" });
        }
    }
}

export default UserController;