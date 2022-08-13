const mongoose = require("mongoose");


const caseSchema = mongoose.Schema({
    image: String,
    localisation:Object,
    route:String,
    caseType:String,
    caseDet:String,
    gouve:String,
    detail:String,
});



module.exports = Case = mongoose.model("case", caseSchema);