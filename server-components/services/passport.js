require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("User");

// Serialize and deserialize
passport.serializeUser((user, done) => {
  console.log("User is being serialized...");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("User is being deserialized...");
  User.findById(id, (err, user) => {
    console.log(
      "Deserializing user. The output below was from findById callback"
    );

    done(err, user);
  });
  // .then(user => {
  //     console.log("Deserializing user. The output below was from then")
  //     console.log(user)
  //     done(null, user)
  // })
});

// Passport will use Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Checking if the user is existing using googleId...");
      User.findOne({ googleId: profile.id }, (err, foundUser) => {
        if (foundUser) {
          console.log("User exists.");
          done(null, foundUser);
        } else {
          console.log("Registering the new user in the database...");
          new User({
            displayName: profile.displayName,
            givenName: profile._json.given_name,
            familyName: profile._json.family_name,
            googleId: profile.id,
            email: profile._json.email,
            profilePicture: profile._json.picture,
          })
            .save()
            .then((user) => {
              console.log("New user has been registered in the database.");
              done(null, user);
            });
        }
      });
    }
  )
);

// Passport will also use Local Strategy

passport.use(User.createStrategy());
