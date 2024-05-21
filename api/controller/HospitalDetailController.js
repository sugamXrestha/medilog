import HospitalDetail from "../models/HospitalDetail.js"


class HospitalDetailController{
    async index(req, res){
        const data = await HospitalDetail.find()
        .populate({
            path: "userId"
          })
          .populate({
            path: "city",
            populate:{
              path: "district",
              populate:{
                path: "state"
              }
            }
          });
        res.status(200).json(data);
    }

    async show(req, res){

    }

    async store(req, res){
        try {
            const hData = new HospitalDetail({...req.body});
            await hData.save();
              res.status(200).json({message:"Hospital Detail was inserted"})
            } catch (err) {
              res.status(500).json({ error: err.message });
            }
  
    }

}

export default HospitalDetailController