const express = require('express');
const router = express.Router();

//route for dashboard
router.get("/", (req, res) => {
    if (req.session.user) {
      res.render("dashboard", { user: req.session.user });
      console.log(req.session);
    } else {
      res.redirect("/login");
    }
  });
  

const value = {
    email: 'justinkj765@gmail.com',
    password:'1234'
}

router.get("/login", (req, res) => {
    if (req.session.user) {
      res.redirect("/");
    } else {
      res.render("base", { title: "loginSystem",nameErr:'',passwdErr:'',nameVal:'' });
    }
  });
  

  router.post("/login", (req, res) => {
    if (req.body.email == value.email &&req.body.password == value.password) {
        req.session.LoggedIn = true;
      req.session.user = req.body.email;
      res.redirect("/login");
    } else if(req.body.email != value.email){
      res.render('base.ejs',{
        nameErr:"User is not found",
        passwdErr:" ",
        nameVal:req.body.email
      });
    }else if(req.body.password != value.password){
        res.render('base.ejs',{
          nameErr:"",
          passwdErr:"wrong password ",
          nameVal:req.body.email
        })
  }});

//route for
router.get("/logout", (req, res) => {
    req.session.destroy()
        res.redirect("/")
        console.log(req.session);
      })
    
module.exports = router;