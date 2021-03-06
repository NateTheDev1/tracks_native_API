require("./models/user");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");

const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

// MongoDB Setup
const mongoUri = `mongodb+srv://Admin:passwordpassword@cluster0-ab6cb.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

mongoose.connection.on("error", () => {
  console.error("Error connecting to the database", err);
});

// Routes

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Server Ready");
});
