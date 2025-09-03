// // index.js
// // where your node app starts

// // init project
// var express = require('express');
// var app = express();

// // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// // so that your API is remotely testable by FCC 
// var cors = require('cors');
// app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });


// // your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });



// // Listen on port set in environment variable or default to 3000
// var listener = app.listen(process.env.PORT || 3000, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

// server.js
const express = require("express");
const app = express();

// Root endpoint
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running");
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  let date;
  if (!dateParam) {
    // If no date provided, use current date
    date = new Date();
  } else {
    // If numeric, treat as Unix timestamp
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Invalid date check
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Export app (for FCC testing)
module.exports = app;

// If running locally, uncomment this:
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

