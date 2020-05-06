require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
const Profile = require("./models/account");


const userProfile = require("./routes/profile");
const resetPasswordRoute = require("./routes/reset_password")

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//connect to mongoose database
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, function(err){
        if (err){
            console.log(err);   
        }
         console.log("Database is connected successfully");
    }
)

//passport.use(Profile.createStrategy());
passport.use(new LocalStrategy(Profile.authenticate())); 

passport.serializeUser(Profile.serializeUser());
passport.deserializeUser(Profile.deserializeUser());

//app.use("/user", userAccount);
app.use("/register", userProfile)
app.use("/reset_password", resetPasswordRoute)


app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    User.findOne({"username": username}, (err, user) => {
        if(err || !user){
            res.send("User not found");           
        } else {
            if(user.hashed_password !== password){

                res.send("Username or password incorrect");
            }
        } 
        if(user && user.hashed_password ){
            res.render("admin_templates/add_user") 
        }      
    })   
})


app.get("/user", (req, res) => {
    res.render("admin_templates/add_user");
})

 app.get("/logout", (req, res) => {
   req.logout();
   res.redirect("/");
 });


app.listen(process.env.PORT, () => {
  console.log("Server started on port 3000");
});
