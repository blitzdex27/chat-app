const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = (app) => {
  app.route("/authme/google").get((req, res) => {
    res.redirect("/auth/google");
  });

  app.route("/auth/google").get(
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app
    .route("/auth/google/callback")
    .get(
      passport.authenticate("google", { failureRedirect: "/signin" }),
      (req, res) => {
        console.log("Successfully logged in.");
        // res.header("Access-Control-Allow-Origin", "*");
        res.json({ isAuthenticated: req.isAuthenticated() });
      }
    );

  // app.route("/signup")

  //     .post((req, res) => {
  //         const username = req.body.username
  //         const password = req.body.password
  //         const givenName = req.body.signupGivenName
  //         const familyName = req.body.signupLastName
  //         const displayName = req.body.signupDisplayName
  //         const email = req.body.username
  //         console.log(givenName)
  //         console.log(req.body)

  //         console.log(username)
  //         if (email == "") {
  //             res.render("signup", {info: "Please enter an email.", isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
  //         }

  //         User.register(new User( {
  //              username:username,
  //              givenName:givenName,
  //              familyName: familyName,
  //              displayName: displayName,
  //              email: email

  //             }), password, (err, account) => {
  //             if (err) {
  //                 res.render("signup", {info: "Sorry, the email is already used. Please use a different one.", isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
  //             } else {
  //                 passport.authenticate('local')(req, res, function() {
  //                     res.redirect("/")
  //                 })
  //             }

  //         })

  //     })

  // app.route("/signin")
  //     .get((req, res) => {

  //         res.render("signin", {isAuthenticated: req.isAuthenticated(), user: userData(req.user), withPic: withPicture(userData(req.user))})
  //     })

  //     .post((req, res) => {
  //         const userCredentials = new User({
  //             username: req.body.username,
  //             password: req.body.password
  //         })

  //         console.log("Checking user credentials...")
  //         req.login(userCredentials, (err) => {
  //             if (err) {
  //                 console.log(err)
  //             } else {
  //                 console.log("Authenticating user...")
  //                 passport.authenticate('local')(req, res, () => {
  //                     console.log("User us authenticated")
  //                     res.redirect("/")
  //                 })
  //             }
  //         })
  //     })

  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });
};
