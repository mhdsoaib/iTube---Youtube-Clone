const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  edited: { type: Boolean, default: false },
  editedAt: { type: Date }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
