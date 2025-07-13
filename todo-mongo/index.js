import express from "express";
import { configDotenv } from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
import protect from "./middlewares/auth.js";

configDotenv();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todo API" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.use('/auth', authRoutes);
app.use('/todos', protect, todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running at port ${PORT}`)
);
