const User = require("../models/User");
const CustomError = require("../utils/customError");

const getUsers = async(req, res) => {
    try {
        const {gender, pageNumber} = req.query;
        const page = (pageNumber-1) * 2;
        let users;
        let count;
        if(!gender){
            [users, count] = await Promise.all([await User.find().skip(page).limit(2).populate("country", "-_id"), await User.countDocuments()]);

            // users = await User.find().skip(page).limit(2);
            // users = await User.find();
            // count = await User.countDocuments();
        }else{
            users = await User.find({gender});
        }
        // throw new CustomError("Esto es una prueba del CustomError", 502);
        res.status(200).json({users, count});
    } catch (error) {
        res.status(error.code || 500).json({message:"I'm sorry, something is wrong with us"});
    }
};

const addUser = async(req,res)=>{
    try {
        const {name, lastname, email, age, gender, admin, country} = req.body;
        const newUser = new User({name, lastname, email, age, gender, admin, country});
        const userSaved = await newUser.save();
        res.status(200).json({message:"El usuario se agregó con éxito", user:userSaved});
    } catch (error) {
        res.status(error.code || 500).json({message:error.message || "Algo falló en los contrroladores de country"});
    }
}

module.exports = {
    getUsers,
    addUser
}