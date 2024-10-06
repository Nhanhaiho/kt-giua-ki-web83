import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";
import userRouter from "./routes/users.routes.js";
import profileRouter from "./routes/profiles.routes.js";
import { login, register } from "./controllers/profiles.controller.js";
import { logout } from "./controllers/token.controller.js";
const app = express();
const PORT = 8386;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home page");
});

app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);

// ket noi vs route user va route profile
app.use("/users", userRouter);
app.use("/profile", profileRouter);

// chay thu server
app.listen(PORT, (err) => {
  if (err) {
    throw new Error();
  }
  console.log(`server is running in http://localhost:${PORT}`);
  connectDB();
});
