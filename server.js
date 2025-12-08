const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Create uploads folder if not exists
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file
  });
});

// Serve uploaded files
app.use("/files", express.static(path.join(__dirname, "uploads")));
// ✅ List all uploaded files
app.get("/files-list", (req, res) => {
  const fs = require("fs");
  fs.readdir("./uploads", (err, files) => {
    if (err) {
      return res.json([]);
    }
    res.json(files);
  });
});
// ✅ List all uploaded files
app.get("/files-list", (req, res) => {
  const fs = require("fs");
  fs.readdir("./uploads", (err, files) => {
    if (err) {
      return res.json([]);
    }
    res.json(files);
  });
});
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
