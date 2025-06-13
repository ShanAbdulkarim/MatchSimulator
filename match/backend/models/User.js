const mongoose = require('mongoose')
const TeamSchema = new mongoose.Schema({
    name: String,
    overall:Number,
    formation:Number,
})

const TeamModel = mongoose.model("teams", TeamSchema)
module.exports = TeamModel