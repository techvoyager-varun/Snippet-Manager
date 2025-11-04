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

// CORS: allow multiple origins incl. localhost for development
const defaultAllowed = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];
const envAllowed = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...defaultAllowed, ...envAllowed]);

const corsOptions = {
  origin: function (origin, callback) {
    // allow non-browser requests (no origin) and allowed origins
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}))

app.use(express.static("public"))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API is running...');
});

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
