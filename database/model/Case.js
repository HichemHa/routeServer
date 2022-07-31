const mongoose = require("mongoose");


const caseSchema = mongoose.Schema({
    image: String,
    localisation:Object,
    route:String,
    caseType:String,
    detail:String,
});



module.exports = Case = mongoose.model("case", caseSchema);