require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const ingestRoutes = require("./routes/ingest");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch(err => console.log("MongoDB Error:", err));

mongoose.connection.on("connected", () => {
    console.log("Connected to DB:", mongoose.connection.name);
});


app.use("/api/ingest", ingestRoutes);


app.get("/", (req, res) => {
  res.send("AiBoO Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log("Backend running on port", process.env.PORT);
});
