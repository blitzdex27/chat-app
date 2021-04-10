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
        res.redirect("/api/user");
      }
    );

  app
    .route("/signup")

    .post((req, res) => {
      console.log(req.body);
      const username = req.body.username;
      const password = req.body.password;
      const givenName = req.body.givenName;
      const familyName = req.body.familyName;
      const displayName = req.body.displayName;
      const email = req.body.username;

      User.register(
        new User({
          username: username,
          givenName: givenName,
          familyName: familyName,
          displayName: displayName,
          email: email,
        }),
        password,
        (err, account) => {
          if (err) {
            console.log(err);
            res.json({ error: err });
          } else {
            passport.authenticate("local")(req, res, function (result) {
              res.redirect("/api/user");
            });
          }
        }
      );
    });

  app.get("/api/user", (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(req.user);

      // res.set({
      //   'Access-Control-Allow-Origin': "http://localhost:3000"
      // })


      res.json({
        isAuthenticated: req.isAuthenticated(),
        userInfo: {
          id: req.user.id,
          username: req.user.username,
          displayName: req.user.displayName,
          givenName: req.user.givenName,
          familyName: req.body.familyName,
          email: req.user.username,
          messages: req.user.messages,
          contacts: req.user.contacts,
        },
      });
    }
  });

  app
    .route("/login")

    .post((req, res) => {
      const userCredentials = new User({
        username: req.body.username,
        password: req.body.password,
      });

      console.log("Checking user credentials...");
      req.login(userCredentials, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Authenticating user...");
          passport.authenticate("local")(req, res, () => {
            console.log("User us authenticated");
            res.redirect("/api/user");
          });
        }
      });
    });

  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });
};
