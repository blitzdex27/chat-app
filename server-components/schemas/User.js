const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  displayName: String,
  givenName: String,
  familyName: String,
  googleId: String,
  email: String,
  profilePicture: String,
  posts: Array,
  contacts: Array,
});

// Injecting passportLocalMongoose
userSchema.plugin(passportLocalMongoose);

new mongoose.model("User", userSchema);
