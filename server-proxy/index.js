const express = require("express");
const request = require("request");
const app = express();
const fetch = require("node-fetch");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  async function foo() {
    const result = await fetch("http://localhost:5000/home");
    const json = await result.json();
    res.json(json);
  }
  foo();
  //   request(
  //     { url: "http://localhost:5000/home" },
  //     (error, response, body) => {
  //       if (error || response.statusCode !== 200) {
  //         return res.status(500).json({ type: "error", message: err.message });
  //       }
  //       console.log(JSON.parse(body))
  //       console.log("hey")
  //       res.json(JSON.parse(body));
  //     }
  //   );
});
app.listen(8000, () => {
  console.log("Server started at port 8000");
});
