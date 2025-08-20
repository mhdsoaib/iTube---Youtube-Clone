const mongoose = require("mongoose");
const Video = require("./models/Video");

const MONGO_URI = "mongodb://localhost:27017"; // Replace 'yourDB' with actual DB name

const sampleVideos = [
    // --- Tech ---
    {
      videoId: "video01",
      title: "How Computers Work - Tech Explained",
      thumbnailUrl: "https://i.ytimg.com/vi/1I5ZMmrOfnA/hqdefault.jpg",
      videoUrl: "https://tech-cdn.com/videos/how-computers-work.mp4",
      description: "Understand the fundamentals of computers and how they work.",
      channelId: "channel01",
      uploader: "user01",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      views: 12000,
      likes: 450,
      dislikes: 12,
      uploadDate: new Date("2024-10-01"),
      comments: [],
      category: "Tech"
    },
    {
      videoId: "video02",
      title: "AI in 2025 - What’s Coming Next",
      thumbnailUrl: "https://i.ytimg.com/vi/kWmX3pd1f10/hqdefault.jpg",
      videoUrl: "https://tech-cdn.com/videos/ai-in-2025.mp4",
      description: "Explore the future of artificial intelligence in everyday life.",
      channelId: "channel02",
      uploader: "user02",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      views: 30000,
      likes: 880,
      dislikes: 20,
      uploadDate: new Date("2024-09-15"),
      comments: [],
      category: "Tech"
    },
  
    // --- Gaming ---
    {
        videoId: "video03",
        title: "Top 10 Insane Gaming Moments 2024",
        thumbnailUrl: "https://external-preview.redd.it/bottom-dollar-bounties-dlc-coming-june-25th-v0-YngwmrgQsQ-omPrrVGL261syzfb0wly8IAlg18V_a18.jpg?format=pjpg&auto=webp&s=386d1675049f078bddbf8dbf1a1dafaf936c3589",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        description: "Watch the craziest and most epic gaming moments from 2024!",
        channelId: "channel03",
        uploader: "user03",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        views: 24500,
        likes: 890,
        dislikes: 16,
        uploadDate: new Date("2024-10-06"),
        comments: [],
        category: "Gaming"
      },      
    {
      videoId: "video04",
      title: "Best Gaming Gear Setup Tour",
      thumbnailUrl: "https://i.ytimg.com/vi/smTK_AeAPHs/hqdefault.jpg",
      videoUrl: "https://gaming-cdn.com/videos/setup-tour.mp4",
      description: "Take a look at this amazing gaming setup tour for 2024.",
      channelId: "channel04",
      uploader: "user04",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      views: 25000,
      likes: 1100,
      dislikes: 9,
      uploadDate: new Date("2024-09-28"),
      comments: [],
      category: "Gaming"
    },
  
    // --- News ---
    {
      videoId: "video05",
      title: "Latest Tech News This Week",
      thumbnailUrl: "https://i.ytimg.com/vi/LXb3EKWsInQ/hqdefault.jpg",
      videoUrl: "https://news-cdn.com/videos/tech-news-weekly.mp4",
      description: "All the hottest news and trends in the tech world.",
      channelId: "channel05",
      uploader: "user05",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      views: 8700,
      likes: 325,
      dislikes: 5,
      uploadDate: new Date("2024-09-10"),
      comments: [],
      category: "News"
    },
    {
      videoId: "video06",
      title: "Global Headlines You Missed",
      thumbnailUrl: "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg",
      videoUrl: "https://news-cdn.com/videos/global-headlines.mp4",
      description: "Catch up on the top global news stories this week.",
      channelId: "channel06",
      uploader: "user06",
      avatarUrl: "https://i.pravatar.cc/150?img=6",
      views: 33400,
      likes: 1400,
      dislikes: 22,
      uploadDate: new Date("2024-09-22"),
      comments: [],
      category: "News"
    },
  
    // --- Music ---
    {
      videoId: "video07",
      title: "Top Pop Songs 2024",
      thumbnailUrl: "https://i.ytimg.com/vi/UceaB4D0jpo/hqdefault.jpg",
      videoUrl: "https://music-cdn.com/videos/top-pop-2024.mp4",
      description: "Listen to the top trending pop songs of this year.",
      channelId: "channel07",
      uploader: "user07",
      avatarUrl: "https://i.pravatar.cc/150?img=7",
      views: 10900,
      likes: 600,
      dislikes: 10,
      uploadDate: new Date("2024-09-18"),
      comments: [],
      category: "Music"
    },
    {
      videoId: "video08",
      title: "Lo-Fi Chill Beats to Study To",
      thumbnailUrl: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
      videoUrl: "https://music-cdn.com/videos/lofi-chill.mp4",
      description: "Relax and focus with these smooth Lo-Fi chill beats.",
      channelId: "channel08",
      uploader: "user08",
      avatarUrl: "https://i.pravatar.cc/150?img=8",
      views: 47000,
      likes: 2000,
      dislikes: 35,
      uploadDate: new Date("2024-09-12"),
      comments: [],
      category: "Music"
    }
  ];
  

mongoose.connect(MONGO_URI)
  .then(async () => {
    await Video.deleteMany({});
    await Video.insertMany(sampleVideos);
    console.log("✅ Sample videos seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error seeding videos:", err.message);
    process.exit(1);
  });
