import City from "../models/City.js";

class CityController{
    async index(req, res){
        const data = await City.find({});
        res.json(data);
    }
    async getCityByDistrict(req, res){
        const DistrictId = req.params.id
        const data = await City.find({district: DistrictId});
        res.json(data);
    }
}

export default CityController