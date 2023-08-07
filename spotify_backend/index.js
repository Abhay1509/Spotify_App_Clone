const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = 8080;

// Connection to mongo db database
mongoose
  .connect(
    "mongodb+srv://chaudhary_abhay:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.rdkhsnv.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.log("Error");
  });

//API : get type
app.get("/", (req, res) => {
  //req contains all data for the request....server<-client
  //res contains all data for the response....server<-db

  res.send("Hello");
});

app.listen(port, () => {
  console.log("App is running on port" + port);
});
