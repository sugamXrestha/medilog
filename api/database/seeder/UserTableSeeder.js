import User from '../../models/User.js';

class UserTableSeeder{
    static async run(){
        let userData = {
            userCode: "500000",
            name: "Admin",
            phone: "9742487088",
            password: "admin123",
            role: "admin",
            stat: "active",
            image: "",
        }
        let findUser = await User.findOne({userCode: userData.userCode});
        if(!findUser){
            let user = new User(userData);
            await user.save();
            console.log("Admin user created successfully");
        }
    }
}
export default UserTableSeeder;