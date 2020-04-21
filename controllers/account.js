const express = require("express");
const router = express.Router();

router.route("/")
    .post(function(req, res) {
        const {
            firstname,middlename,lastname,
            email,dateofbirth,country,
            mobile,gender,faculty,
            department,degree,usertype
        }   = req.body;

        const matN = "927";
        const matNumber = dateofbirth.toString().slice(0,3).concat(matN);
        console.log(req.body);
        
    })



class Account{
    getUser







}

module.exports = router;