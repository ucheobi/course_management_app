require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

const userAccount = require("./controllers/account")

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}))


app.use("/user", userAccount);


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
  
app.get("/", function(req, res){
    res.render("index");
})


app.post("/login", function(req, res){
    const { username, password } = req.body;
    
    User.findOne({"username": username}, function(err, user){
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

app.get("/user", function(req, res){
    res.render("admin_templates/add_user");
})



const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log("Server started on port 3000");
});
