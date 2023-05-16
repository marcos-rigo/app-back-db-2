const {Schema, model} = require("mongoose");

const CountrySchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:20
    },
    timeZone:String
},
{
    timeseries:{
        createdAt:true
    },
    versionKey:false
})

module.exports = model("Country", CountrySchema);