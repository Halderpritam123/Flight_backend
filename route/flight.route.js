const express=require('express');
const { FlightModel } = require('../model/flignt.model');
const flightRoute=express.Router()
flightRoute.post('/add', async (req, res) => {
  try {
    const flight = new FlightModel(req.body);
    await flight.save();
    res.status(201).json("new Data Added");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


flightRoute.get("/", async (req, res) => {
    const query = {};
  
    if (req.query.startingAirport) {
      query.startingAirport = req.query.startingAirport;
    }
  
    if (req.query.endingAirport) {
      query.endingAirport = req.query.endingAirport;
    }
  
    if (req.query.airline) {
      query.airline = req.query.airline;
    }
    if (req.query.type) {
      query.type = req.query.type;
    }
  
    let sortQuery = {};
  
    if (req.query.sortBy && req.query.sortOrder) {
      sortQuery[req.query.sortBy] = req.query.sortOrder === "desc" ? -1 : 1;
    }
  
    const pageSize = parseInt(req.query.limit || "10");
    const page = parseInt(req.query.page || "1");
  
   try {
    const flights = await FlightModel.find(query)
    .sort(sortQuery)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
    const totalFlights = await FlightModel.countDocuments(query);
    const totalPages = Math.ceil(totalFlights / pageSize);
  res.send({flights,totalPages,totalFlights});
   } catch (error) {
    console.log(error)
   }
  });
  //update flights
  flightRoute.patch("/update/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await FlightModel.findByIdAndUpdate({ _id: Id }, req.body);
    res.status(200).send("flight has ben updated");
  } catch (err) {
    console.log(err);
  }
});
//delete flights
flightRoute.delete("/delete/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await FlightModel.findByIdAndDelete({ _id: Id });
    res.status(200).send("flight has ben deleted");
  } catch (err) {
    console.log(err);
    res.send("something wrong");
  }
});
  module.exports={flightRoute}