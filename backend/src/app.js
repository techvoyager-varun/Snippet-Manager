import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import snippetRouter from "./routes/snippet.routes.js";

dotenv.config({
    path: './.env'
});

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}))

app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users", userRouter);
app.use("/api/v1/snippets", snippetRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message
  });
});


export { app }