const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//bu
// // ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
// const PORT = process.env.PORT || 5005;

// // ℹ️ Connects to the database

// // ℹ️ If connection was successful, start listening for requests
// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });
