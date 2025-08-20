const Video = require("./models/Video");
const Comment = require("./models/Comments");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key"; // Use environment variable for production

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Frontend URL, change for production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017"; // Change if using remote DB

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Token verification middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // Assuming "Bearer <token>"
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded; // Attach decoded user data to request
    next();
  });
}

// Get all videos
app.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos", details: error.message });
  }
});

// Get video by videoId
app.get("/videos/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findOne({ videoId });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Get comments by videoId
app.get("/comments/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ timestamp: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments", details: err.message });
  }
});

// Post a comment (Requires authentication)
app.post("/comments", async (req, res) => {
  const { videoId, username, text } = req.body;

  console.log("Request Body:", req.body); // Log request body for debugging

  if (!videoId || !username || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newComment = new Comment({ videoId, username, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error posting comment:", err); // Log error for debugging
    res.status(500).json({ error: "Failed to post comment", details: err.message });
  }
});


// Register Route
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    // Storing password in plain text (NOT RECOMMENDED)
    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, username }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, username });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// Get videos by username
app.get("/api/user/:username/videos", async (req, res) => {
  try {
    const { username } = req.params;
    const videos = await Video.find({ username });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's videos", details: err.message });
  }
});

app.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  try {
    const result = await Comment.deleteOne({ _id: id });  // Use deleteOne directly

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment", details: err.message });
  }
});



// Update a comment (Requires authentication)
app.put("/comments/:id", async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  try {
    const result = await Comment.updateOne(
      { _id: id },           // Find the comment by its ID
      { $set: { text } }      // Set the new text value
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment", details: err.message });
  }
});

const path = require("path");

// If in production, serve React build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
