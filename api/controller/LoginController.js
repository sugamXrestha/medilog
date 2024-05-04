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
                return res.json({token: token, role: role});
            }
        }
    }

    async tokenVerify(req, res){
        let token = req.headers.authorization.split(" ")[1];
        let response = TokenVerify.verifyToken(token);
        if(response){
            return res.json({status: true});
        }else{
            return res.json({status: false});
        }
    }
}

export default LoginController