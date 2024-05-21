import User from "../models/User.js";
import TokenVerify from "../middleware/TokenVerify.js";

class LoginController{
    
    async login(req, res){
        let {userCode, password} = req.body;
        let findData = await User.findOne({userCode: userCode});
        if(!findData){
            return res.json({userCodeError: 'Invalid UserCode'});
        }else{
            let isMatch = await findData.comparePassword(password);
            if(!isMatch){
                return res.json({passwordError: 'Invalid password'});
            }else{
                let token = findData.generateToken();
                let role = findData.role
                let stat = findData.stat
                let id = findData.id
                return res.json({token: token, role: role, stat: stat, id: id});
            }
        }
    }
    // async show(req, res){
    //     let id = req.params.id;
    //     await User.findById(id);
    //     res.status(200);
    // }

    async tokenVerify(req, res){
        let token = req.headers.authorization.split(" ")[1];
        // console.log("Received Token:   " + token);
        let response = TokenVerify.verifyToken(token);
        if(response){
            return res.json({status: true, role: response.role, stat: response.stat, id: response._id});
        }else{
            return res.json({status: false});
        }
    }
}

export default LoginController