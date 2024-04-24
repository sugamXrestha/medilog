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
            const user = new User({...req.body});
            await user.save();
            res.json(data);
            res.status(201).json({ message: 'User created successfully' });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }
    async update(req, res){

    }
    async destroy(req, res){

    }
}

export default UserController;