const express = require("express");
const router = express.Router();
const generator = require("generate-password");
const nodemailer = require("nodemailer");
const Profile = require("../models/account");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secureConnection: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.G_PASS,
  },
});


router.post("/", (req, res, next) => {

            //generate password 
            const password = generator.generate({
              length: 10,
              number: true,
              uppercase: true
            });
          
            const {
                firstname,middlename,lastname,
                email,dateofbirth,country,
                mobile,gender,faculty,
                department,degree,role
            }   = req.body;

            const mat_number = generateMatNumber(firstname, lastname, dateofbirth)
            const fh_email = createEmails(firstname,lastname,role);


          userProfile = new Profile({
              username: fh_email,
              mat_number: mat_number,
              first_name: firstname,
              middle_name: middlename,
              last_name: lastname,
              email: email,
              date_of_birth: dateofbirth.slice(3,11),
              nationality: country,
              phone_number: mobile,
              gender: gender,
              faculty: faculty,
              department: department,
              degree: degree,
              role: role,
          }); 
  
          Profile.register(userProfile, password, (err, user) => { 
            if (err) { 
              res.json({success:false, message:"Your account could not be saved. Error: ", err})  
            }else{ 

                const mailOptions = {
                  from: "support@fh-admin.com",
                  to: user.email,
                  subject: "Welcome to FH University",
                  html: `<h3>Hello Ms. ${user.first_name} ${user.last_name},</h3>

                          <p>You have successfully enrolled at Fh University.</p>

                          <p>Username => <b>${user.username}</b></p>
                          <p>Matriculation number => <b>${user.mat_number}</b></p>

                          <strong>NB: Your password will be given to you at the secretariat office</strong>

                          <p><a href="http://localhost:3000/register/reset_password">Please click here to change your password</a></p><br>



                          <p>Best regards,</p>
                          
                          <p>Admin</p>`,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent: " + info.response);
                  }
                });

              res.render("./admin_templates/view_user", { data: user, pwd: password});         
            } 
          }); 
 });
  

//generate mat number or ID 
const generateMatNumber = (first, last, dob) => {
  const ID = 98;
 // const admin_ID = 
  const char0 = first[0].toUpperCase() + last[0].toUpperCase();
  const mat_value = ID + dob.slice(5) + char0;
  return mat_value;
};

//generate emails
const createEmails = (first, last, role) => {
  const firstN = first.toLowerCase();
  const lastN = last.toLowerCase();
  const roleN = role.toLowerCase();

  switch (roleN) {
    case "student":
      return `${firstN}.${lastN}@fh-student.com`;
      break;
    case "lecturer":
      return `${firstN}.${lastN}@fh.com`;
      break;
    case "admin":
      return `${firstN}.${lastN}@fh-admin.com`;
      break;
    default:
      alert("Sorry, I don't understand your role here!!!");
  }
}


module.exports = router;