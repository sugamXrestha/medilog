import User from "../models/User.js";
import fs from 'fs';
import TokenVerify from '../middleware/TokenVerify.js'
import bcrypt from 'bcrypt'

class UserController{
    async index(req, res){
        const data = await User.find()
        res.status(200).json(data);
    }
    async show(req, res){
      let id = req.params.id;
      const users = await User.findById(id);
      res.status(200).json(users);
    }

    async store(req, res){
      console.log(req.body)
        try {
          const user = new User({...req.body});
          await user.save();
            // await User.create({...req.body.data})           
            res.status(200).json({message:"User was inserted"})
          } catch (err) {
            res.status(500).json({ error: err.message });
          }

       
    }
    async update(req, res){
      try {
        const id = req.params.id;
        const { password, stat } = req.body;
    let image = req.file ? req.file.filename : undefined; // Check if req.file exists

    const user = await User.findById(id);
    
    if(image !== undefined){
          if (user.image != "") {
            let preImage = user.image;
            let imagePath = `public/users/${preImage}`;
            if(fs.existsSync(imagePath)){
              fs.unlinkSync(imagePath);
            }
          }
          image = req.file.filename;
          await User.findByIdAndUpdate(id, {image: image});
          res.status(200).json({ status: true, message: "Profile updated successfully!" });
        }else{
    
          // Hash the new password
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Update the user's password with the hashed password
          await User.findByIdAndUpdate(id, { password: hashedPassword , stat: stat});
          res.status(200).json({ status: true, message: "Password updated successfully!" });
        }

      } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error" });
        }
    }
    // async changePassword(req, res){
    //   try {
    //     const id = req.params.id;
    //     const { password, status } = req.body;
    
    //     // Hash the new password
    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     // Update the user's password with the hashed password
    //     await User.findByIdAndUpdate(id, { password: hashedPassword , status: status});
    //     res.status(200).json({ status: true, message: "Password updated successfully!" });

    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ status: false, message: "Internal server error" });
    //     }
    // }

   
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

    async getProfile(req, res){
      let token = req.headers.authorization.split(" ")[1];
      let response = TokenVerify.verifyToken(token);
      let id = response.id;
      
      const user = await User.findById(id).populate("userCode phone")
      return res.status(200).json(user);
    }
    
    
}

export default UserController;