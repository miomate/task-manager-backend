import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes";

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "https://taskmanager-front-miomate.netlify.app/", // Replace with your actual frontend URL
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());

// Mount category routes
app.use("/api/categories", categoryRoutes);

// Catch-all for unknown routes (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message:
      "This route does not exist. Please check your URL or the API documentation.",
  });
});

// Global error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("ERROR", req.method, req.path, err);
  res.status(500).json({
    message: "Internal server error. Check the server console for details.",
  });
});

export default app;

//backup
// // ℹ️ Gets access to environment variables/settings
// // https://www.npmjs.com/package/dotenv
// require('dotenv').config()

// // Handles http requests (express is node js framework)
// // https://www.npmjs.com/package/express
// const express = require('express')

// const app = express()

// // ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// require('./config')(app)

// // 👇 Start handling routes here
// const indexRoutes = require('./routes/index.routes')
// app.use('/api', indexRoutes)

// // ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require('./error-handling')(app)

// module.exports = app
