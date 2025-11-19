import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import linkRoutes from "./routes/links.js";
import Link from "./models/Link.js";

dotenv.config();

const app = express();
connectDB()

// middlewares
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// routes
app.use("/api/links", linkRoutes);

// Redirect route
app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    // Find the link by code
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    // Increase click count
    link.clicks += 1;
    await link.save();

    // Redirect to original URL
    return res.redirect(link.targetUrl);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});


//Start server 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
