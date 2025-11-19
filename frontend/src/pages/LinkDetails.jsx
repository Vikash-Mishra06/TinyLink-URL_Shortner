import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function LinkDetails() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLink = async () => {
    try {
      const res = await API.get(`/api/links/${code}`);
      setLink(res.data);
    } catch (err) {
      setError("Link not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLink();
  }, []);

  const deleteLink = async () => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      await API.delete(`/api/links/${code}`);
      alert("Deleted successfully");
      navigate("/");
    } catch (err) {
      alert("Error deleting link");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Link Details</h2>

      <p><strong>Code:</strong> {link.code}</p>
      <p><strong>Original URL:</strong> {link.targetUrl}</p>
      <p><strong>Clicks:</strong> {link.clicks}</p>
      <p><strong>Created:</strong> {new Date(link.createdAt).toLocaleString()}</p>

      <button
        onClick={deleteLink}
        style={{ padding: "10px", marginTop: "20px", background: "red", color: "white", cursor: "pointer" }}
      >
        Delete Link
      </button>
    </div>
  );
}
