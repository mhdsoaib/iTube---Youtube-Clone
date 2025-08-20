import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WatchPage.css";
import Comments from "../components/Comments";

const WatchPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/videos/${videoId}`);
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (!video) return <div className="watch-page">Loading...</div>;

  return (
    <div className="watch-page">
      <div className="video-player">
        <video controls width="100%" src={video.videoUrl} />
      </div>

      <div className="video-details">
        <h2>{video.title}</h2>
        <div className="uploader-info">
          <img src={video.avatarUrl} alt={video.channelName} />
          <div>
            <p>{video.channelName}</p>
            <p>{video.views} views • {video.duration}</p>
          </div>
        </div>
        <p className="description">
          {video.description || "No description provided."}
        </p>
      </div>

      <Comments videoId={video._id} />
      </div>
  );
};

export default WatchPage;
