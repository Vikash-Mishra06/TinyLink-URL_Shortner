import { useState } from "react";
import API from "../api";

export default function CreateLink() {
  const [targetUrl, setTargetUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const body = { targetUrl };
      if (customCode.trim() !== "") body.customCode = customCode.trim();

      const res = await API.post("/api/links", body);
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("This custom code is already used. Try another.");
      } else {
        setError("Something went wrong. Check the URL.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Create a New Short Link</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
        
        <label>Enter Target URL:</label>
        <input
          type="text"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="https://example.com"
          required
          style={{ padding: "10px", marginBottom: "15px" }}
        />

        <label>Custom Code (optional):</label>
        <input
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="my-custom-link"
          style={{ padding: "10px", marginBottom: "15px" }}
        />

        <button type="submit" style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}>
          Create Short Link
        </button>

      </form>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your Short Link:</h3>
          <a href={shortUrl} target="_blank">{shortUrl}</a>
        </div>
      )}
    </div>
  );
}
