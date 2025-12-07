const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json()); // JSON body parse

// DB connect
connectDB();

// Middlewares
app.use(cors());
const userRoute = require("./routes/authRoutes");
const postRoute = require("./routes/postRoutes");
// Routes
app.get("/", (req, res) => {
  res.send("Blog API running...");
});
 
app.use("/",userRoute);
app.use("/",postRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
