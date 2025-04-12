import React, { useEffect, useState } from "react";
import "./Comments.css";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/comments/${videoId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, username, text }),
      });

      if (res.ok) {
        setText("");
        fetchComments();  // Refresh comments after posting
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // or use your token management approach
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      // Remove the deleted comment from the state
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      console.log('Comment deleted');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const startEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/comments/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });

      if (res.ok) {
        setEditingId(null);
        setEditText("");
        fetchComments();  // Refresh comments after edit
      } else {
        console.error("Failed to update comment");
      }
    } catch (err) {
      console.error("Failed to update comment", err);
    }
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <div className="comment-list">
        {comments.map((c) => (
          <div key={c._id} className="comment">
            <strong>{c.username}</strong>
            {editingId === c._id ? (
              <form onSubmit={handleEdit} className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <p>{c.text}</p>
            )}
            {c.username === username && editingId !== c._id && (
              <div className="comment-actions">
                <button onClick={() => startEdit(c._id, c.text)}>Edit</button>
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
