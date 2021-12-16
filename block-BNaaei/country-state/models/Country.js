var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    name:{type:String},
    states:[{type:Schema.Types.ObjectId,ref:"State"}],
    continent:{type:String},
    population:{type:Number},
    ethnicity:[String],
    neighbouring_countires:[{type:Schema.Types.ObjectId,ref:"Country"}],
    area:Number
})


module.exports = mongoose.model("Country",countrySchema)