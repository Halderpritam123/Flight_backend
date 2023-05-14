const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { flightRoute } = require("./route/flight.route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/flights',flightRoute)
app.get("/",async(req,res)=>{
    await res.send("home Page")
  })
// Start server
app.listen(8080,async () =>{
    try {
      await connection
        console.log("connect to db")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running on port 8080")
})
