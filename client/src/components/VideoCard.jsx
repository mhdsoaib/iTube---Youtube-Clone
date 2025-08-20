// src/components/VideoCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video, onEdit, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault(); // prevent Link navigation
    if (window.confirm("Are you sure you want to delete this video?")) {
      onDelete?.(video._id);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault(); // prevent Link navigation
    onEdit?.(video._id);
  };

  return (
    <Link to={`/watch/${video.videoId || video._id}`} className="video-link">
      <div className="video-card">
        <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
        <div className="video-info">
          {video.avatarUrl && (
            <img src={video.avatarUrl} alt={video.channelName} className="avatar" />
          )}
          <div className="text-info">
            <h4>{video.title}</h4>
            <p>{video.channelName || video.channelId}</p>
            <p>{video.duration || `${video.views} views`}</p>
          </div>
        </div>

        {/* Optional buttons shown only if passed */}
        {(onEdit || onDelete) && (
          <div className="video-actions">
            {onEdit && (
              <button className="btn-edit" onClick={handleEdit}>
                Edit
              </button>
            )}
            {onDelete && (
              <button className="btn-delete" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default VideoCard;
