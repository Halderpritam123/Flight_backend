const mongoose=require('mongoose')
const flightSchema =mongoose.Schema({
    airline:{type: String, required: true},
    image:{type: String, required: true},
    flightNumber:  {type: String, required: true},
    startingAirport:  {type: String, required: true},
    endingAirport: {type: String, required: true},
    startingAirportName:  {type: String, required: true},
    endingAirportName: {type: String, required: true},
    "departure":{type: String, required: true},
    "arrival":{type: String, required: true},
    "duration":{type: String, required: true},
    "type":{type: String, required: true},
    price: {type: Number, required: true}
  },{
    versionKey:false
})
const FlightModel = mongoose.model("Flight", flightSchema);
module.exports={FlightModel}