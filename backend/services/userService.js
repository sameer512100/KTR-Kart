const userModel = require('../models/userM');

module.exports.createUser = async ({name,email,password})=>{
    if(!name  || !email || !password){
        throw new Error('All fields are required');
    }
    const user = new userModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    await user.save();
    return user;
}