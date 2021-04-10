const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017",
  {
    dbName: "chat-app",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB is connected.");
    }
  }
);
