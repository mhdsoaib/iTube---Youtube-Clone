import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import "./ChannelPage.css";

const mockVideos = [
    {
      _id: "1",
      title: "React Tutorial for Beginners",
      thumbnailUrl: "https://img.youtube.com/vi/dGcsHMXbSOA/mqdefault.jpg",
      views: 1234,
      channelId: "channel123",
      ownerId: "user1",
    },
    {
      _id: "2",
      title: "CSS Grid in 10 Minutes",
      thumbnailUrl: "https://img.youtube.com/vi/jV8B24rSN5o/mqdefault.jpg",
      views: 456,
      channelId: "channel123",
      ownerId: "user1",
    },
    {
      _id: "3",
      title: "JavaScript ES6 Features Explained",
      thumbnailUrl: "https://img.youtube.com/vi/NCwa_xi0Uuc/mqdefault.jpg",
      views: 985,
      channelId: "channel123",
      ownerId: "user1",
    },
    {
      _id: "4",
      title: "Mastering Flexbox",
      thumbnailUrl: "https://img.youtube.com/vi/JJSoEo8JSnc/mqdefault.jpg",
      views: 678,
      channelId: "channel123",
      ownerId: "user1",
    },
    {
      _id: "5",
      title: "HTML Forms Deep Dive",
      thumbnailUrl: "https://img.youtube.com/vi/kDyJN7qQETA/mqdefault.jpg",
      views: 321,
      channelId: "channel456",
      ownerId: "user2",
    },
    {
      _id: "6",
      title: "Backend with Node.js & Express",
      thumbnailUrl: "https://img.youtube.com/vi/Oe421EPjeBE/mqdefault.jpg",
      views: 1500,
      channelId: "channel789",
      ownerId: "user3",
    },
    {
      _id: "7",
      title: "MongoDB Crash Course",
      thumbnailUrl: "https://img.youtube.com/vi/-56x56UppqQ/mqdefault.jpg",
      views: 1290,
      channelId: "channel789",
      ownerId: "user3",
    },
    {
      _id: "8",
      title: "Building a Todo App with React",
      thumbnailUrl: "https://img.youtube.com/vi/3PHXvlpOkf4/mqdefault.jpg",
      views: 890,
      channelId: "channel123",
      ownerId: "user1",
    },
  ];
  

const ChannelPage = () => {
  const { username } = useParams();
  const [videos, setVideos] = useState([]);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editData, setEditData] = useState({ title: "", thumbnailUrl: "", views: "" });

  useEffect(() => {
    setVideos(mockVideos);
  }, []);

  const handleDelete = (id) => {
    setVideos((prev) => prev.filter((video) => video._id !== id));
  };

  const startEdit = (video) => {
    setEditingVideoId(video._id);
    setEditData({ title: video.title, thumbnailUrl: video.thumbnailUrl, views: video.views });
  };

  const cancelEdit = () => {
    setEditingVideoId(null);
    setEditData({ title: "", thumbnailUrl: "", views: "" });
  };

  const saveEdit = () => {
    setVideos((prev) =>
      prev.map((video) =>
        video._id === editingVideoId ? { ...video, ...editData } : video
      )
    );
    cancelEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="channel-page">
      <div className="channel-header">
        <div className="avatar">{username?.charAt(0).toUpperCase()}</div>
        <div className="info">
          <h2>{username}'s Channel</h2>
          <p className="subscriber-count">
            100K subscribers • {videos.length} videos
          </p>
        </div>
      </div>

      <div className="channel-videos">
        {videos.length === 0 ? (
          <p className="no-videos">No videos uploaded yet.</p>
        ) : (
          <div className="video-grid">
            {videos.map((video) =>
              editingVideoId === video._id ? (
                <div key={video._id} className="edit-form">
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    placeholder="Video title"
                  />
                  <input
                    type="text"
                    name="thumbnailUrl"
                    value={editData.thumbnailUrl}
                    onChange={handleChange}
                    placeholder="Thumbnail URL"
                  />
                  <input
                    type="number"
                    name="views"
                    value={editData.views}
                    onChange={handleChange}
                    placeholder="Views"
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <VideoCard
                  key={video._id}
                  video={video}
                  onDelete={() => handleDelete(video._id)}
                  onEdit={() => startEdit(video)}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
