const express = require("express");
const router = express.Router();
const Profile = require("../models/account");


//===================route to change password for new users 

router.get("/", (req, res, next) => {
  res.render("./admin_templates/reset_password"); //index is here
});
 

 router.post("/", (req, res) => {

    const { username, oldpassword, newpassword } = req.body;

    Profile.findOne({ username: username }, (err, user) => {
      // Check if error connecting
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if user was found in database
        if (!user) {
          res.json({ success: false, message: "User not found" }); // Return error, user was not found in db
        } else {
          user.changePassword(oldpassword, newpassword, (err) => {
              if (err) {
                if (err.name === "IncorrectPasswordError") {
                  res.json({ success: false, message: "Incorrect password" }); // Return error
                } else {
                  res.json({
                    success: false,
                    message:
                      "Something went wrong!! Please try again later.",
                  });
                }
              } else {
                res.json({
                  success: true,
                  message: "Your password has been changed successfully",
                });
              }
            }
          );
        }
      }
    });
  });

  module.exports = router;
