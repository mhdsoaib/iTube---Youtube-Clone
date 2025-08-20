import React, { useEffect, useState } from "react";
import "./HomePage.css";
import VideoCard from "../components/VideoCard";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["All", "Music", "Gaming", "News", "Tech"];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/videos");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };

    fetchVideos();

    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <button className="menu-button" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div className="header-content">
        <link rel="icon" type="image/png" href="./client/public/youtube.png" />
          <h1 className="logo">iTube</h1>
          {username ? (
            <div
              className="user-dropdown"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <span className="user-name">{username}</span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to={`/channel/${username}`} className="dropdown-item">
                    My Channel
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="signin-button"
              onClick={() => (window.location.href = "/auth")}
            >
              Sign In
            </button>
          )}
        </div>

        <input
          type="text"
          className="search-bar"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li><i className="fas fa-home"></i> Home</li>
          <li><i className="fas fa-fire"></i> Trending</li>
          <li><i className="fas fa-play-circle"></i> Subscriptions</li>
          <li><i className="fas fa-history"></i> History</li>
        </ul>
      </aside>

      {/* Category Filter */}
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <div key={video.videoId || video._id} className="video-card-wrapper">
            <VideoCard video={video} />
            <div className="channel-link">
              <Link to={`/channel/${video.username}`} className="channel-name-link">
                {video.username}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
