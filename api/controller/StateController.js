import State from "../models/State.js";

class StateController{
    async index(req, res){
        const data = await State.find({});
        res.json(data);
    }
    async show(req, res){
        const id = req.params.id;
        const data = await State.findById(id);
        res.json(data);
    }
}

export default StateController