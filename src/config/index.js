const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

module.exports = (app) => {

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: FRONTEND_URL,

    })
  );


  app.use(logger("dev"));


  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
//----------------------------
// const express = require("express");
// const logger = require("morgan");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// // Remove trailing slashes from ORIGIN (if any) to match the browser's Origin header exactly.
// const FRONTEND_URL = process.env.ORIGIN
//   ? process.env.ORIGIN.replace(/\/+$/, "")
//   : "http://localhost:5173";

// module.exports = (app) => {
//   // Trust the proxy (useful for platforms like Vercel)
//   app.set("trust proxy", 1);

//   // Set up CORS middleware with a whitelist approach
//   app.use(
//     cors({
//       origin: function (origin, callback) {
//         // Allow requests with no origin (like curl or mobile apps)
//         if (!origin) return callback(null, true);
//         if (origin === FRONTEND_URL) {
//           callback(null, true);
//         } else {
//           callback(new Error(`Not allowed by CORS: ${origin}`));
//         }
//       },
//       methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     })
//   );

//   // Use logger to log requests (good for debugging)
//   app.use(logger("dev"));

//   // Parse incoming JSON requests
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));
//   app.use(cookieParser());
// };
//-----------------------------------------------------------
// cors issues with the frontend
// // We reuse this import in order to have access to the `body` property in requests
// const express = require('express')

// // ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// // https://www.npmjs.com/package/morgan
// const logger = require('morgan')

// // ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// // https://www.npmjs.com/package/cookie-parser
// const cookieParser = require('cookie-parser')

// // ℹ️ Needed to accept from requests from 'the outside'. CORS stands for cross origin resource sharing
// // unless the request if from the same domain, by default express wont accept POST requests
// const cors = require('cors')

// const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:5173'

// // Middleware configuration
// module.exports = app => {
//   // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
//   // Services like heroku use something called a proxy and you need to add this to your server
//   app.set('trust proxy', 1)

//   // controls a very specific header to pass headers from the frontend
//   app.use(
//     cors({
//       origin: [FRONTEND_URL],
//     })
//   )

//   // In development environment the app logs
//   app.use(logger('dev'))

//   // To have access to `body` property in the request
//   app.use(express.json())
//   app.use(express.urlencoded({ extended: false }))
//   app.use(cookieParser())
// }
