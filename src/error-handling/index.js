const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Remove trailing slashes from ORIGIN (if any) to match the browser's Origin header exactly.
const FRONTEND_URL = process.env.ORIGIN
  ? process.env.ORIGIN.replace(/\/+$/, "")
  : "http://localhost:5173";

module.exports = (app) => {
  // Trust the proxy (useful for platforms like Vercel)
  app.set("trust proxy", 1);

  // Set up CORS middleware with a whitelist approach
  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like curl or mobile apps)
        if (!origin) return callback(null, true);
        if (origin === FRONTEND_URL) {
          callback(null, true);
        } else {
          callback(new Error(`Not allowed by CORS: ${origin}`));
        }
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Use logger to log requests (good for debugging)
  app.use(logger("dev"));

  // Parse incoming JSON requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};

// module.exports = app => {
//   app.use((req, res) => {
//     // this middleware runs whenever requested page is not available
//     res.status(404).json({
//       message:
//         'This route does not exist, you should probably look at your URL or what your backend is expecting',
//     })
//   })

//   app.use((err, req, res) => {
//     // whenever you call next(err), this middleware will handle the error
//     // always logs the error
//     console.error('ERROR', req.method, req.path, err)

//     // only render if the error ocurred before sending the response
//     if (!res.headersSent) {
//       res.status(500).json({
//         message: 'Internal server error. Check the server console',
//       })
//     }
//   })
// }
