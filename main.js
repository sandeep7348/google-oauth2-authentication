require("dotenv").config()
const express=require("express")
const morgan=require("morgan")
const app=express()
const passport=require("passport")
var GoogleStrategy = require('passport-google-oauth20').Strategy;
app.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_USER_URL
  },
  function(_, __, profile, cb) {
      return cb(null,profile)
  }
));
app.use(morgan("dev"));
app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile","email"] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/',session:false }),
  function(req, res) {
    console.log(req.user)
    res.redirect('/');
  });
app.get("/",(req,res)=>{
    res.send("Hello Welcome to the Home Page")
})
app.listen(3000,()=>{
     console.log("server is up and running at port 3000")
})