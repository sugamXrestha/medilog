import User from "../models/User.js";

class UserController{
    async index(req, res){
        const data = await User.find({});
        res.json(data);
    }
    async show(req, res){

    }
    async store(req, res){
        const data = new User({...req.body});
        await data.save();
        res.json(data);
    }
    async update(req, res){

    }
    async destroy(req, res){

    }
}

export default UserController;