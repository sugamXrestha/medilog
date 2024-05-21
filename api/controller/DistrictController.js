import District from "../models/District.js";
// import State from "../models/State.js";

class DistrictController{
    async index(req, res){
        const data = await District.find({});
        res.json(data);
    }
    async getDistrictByProvince(req, res){
        const id = req.params.id
        const data = await District.find({state: id});
        res.json(data);
    }
}

export default DistrictController