const Country = require("../models/Country");

const addCountry = async(req,res)=>{
    try {
        const {name, timeZone} = req.body;
        const newCountry = new Country({name, timeZone});
        const countrySaved = await newCountry.save();
        res.status(200).json({message:"El país se agregó con éxito", country:countrySaved});
    } catch (error) {
        res.status(error.code || 500).json({message:error.message || "Algo falló en los contrroladores de country"});
    }
}

module.exports = {addCountry};