const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  senderName: String,
  receipient: String,
  receipientName: String,
  date: String,
  time: String,
  content: String,
  specificDateTime: Number,
});

new mongoose.model("Post", messageSchema);
