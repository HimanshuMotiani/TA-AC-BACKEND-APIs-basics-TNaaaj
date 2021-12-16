var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stateSchema = new Schema({
    name:{type:String,required:true},
    population:{type:Number},
    ethnicity:[String],
    area:Number,
    countryId:{type:Schema.Types.ObjectId,ref:"Country"},
    neighbouring_states:[{type:Schema.Types.ObjectId,ref:"State"}],
})


module.exports = mongoose.model("State",stateSchema)