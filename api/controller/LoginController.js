import User from "../models/User.js";

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
                return res.json({token: token});
            }
        }
    }
}

export default LoginController