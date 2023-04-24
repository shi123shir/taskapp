const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require("./router/route")
 const app = express()
 const dp = require("./dbConfig/dbconnection")



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("https://todo-app-7a59.onrender.com",route)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

