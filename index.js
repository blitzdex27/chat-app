const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// import

// connect to mongoDB
require("./server-components/services/mongoose");

// import Schemas
require("./server-components/schemas/Message");
require("./server-components/schemas/User");

// import passport strategies
require("./server-components/services/passport");

// Use session
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Make express use the passport strategies
app.use(passport.initialize());
app.use(passport.session());

// import authroutes
require("./server-components/routes/authRoutes")(app);

app.route("/home").get((req, res) => {
  const foo = {
    id: "1234",
    name: "Dexter",
    chats: [
      {
        message: "Hello Dexter",
        origin: "Joe",
        originID: "1235",
        dateTime: "Apr 10, 2021 04:40",
      },
      {
        message: "Hello Joe",
        origin: "Dexter",
        originID: "1234",
        dateTime: "Apr 10, 2021 05:40",
      },
    ],
    contactList: [{ Jerome: "#" }, { Danny: "#" }],
  };
  res.json(foo);
});

app.route("/send-message").post((req, res) => {
  console.log(req.body);
  res.send({
    name: "hey",
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
  console.log("Server started at port " + port);
});
