import { useEffect, useState } from "react";
import API from "../api";

export default function Status() {
  const [status, setStatus] = useState("Checking...");
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    try {
      const res = await API.get("/health");
      if (res.data.status === "ok") {
        setStatus("Backend is running fine ✔");
      } else {
        setStatus("Backend is unreachable ❌");
      }
    } catch (err) {
      setStatus("Backend is unreachable ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  if (loading) return <p>Checking backend...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>API Status</h2>
      <p style={{ marginTop: "10px", fontSize: "18px" }}>{status}</p>
    </div>
  );
}
