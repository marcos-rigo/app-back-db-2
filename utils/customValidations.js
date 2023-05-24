const User = require("../models/User");


const checkIfUserExist = async (id) =>{
    const user = await User.findById(id);
    if (!user) throw new Error("El usuario no existe", 404);
  }

  module.exports = {checkIfUserExist}