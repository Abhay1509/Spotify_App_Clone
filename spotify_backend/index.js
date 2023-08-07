const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = 8080;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");

app.use(express.json()); // It is done to convert the data coming from req.body in /register api to json first

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
    console.log("Error", err);
  });

//Setup JWT

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SecretKey";

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

//API : get type
app.get("/", (req, res) => {
  //req contains all data for the request....server<-client
  //res contains all data for the response....server<-db

  res.send("Hello");
});
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log("App is running on port" + port);
});
