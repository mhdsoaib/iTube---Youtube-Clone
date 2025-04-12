const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String },
  channelId: { type: String, required: true },
  uploader: { type: String, required: true },
  avatarUrl: {type:String, required: true},
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  comments: [
    {
      commentId: String,
      userId: String,
      text: String,
      timestamp: Date,
    },
  ],
  category: {type:String},
});

module.exports = mongoose.model("Video", videoSchema);
