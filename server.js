const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.port || 5000;

app.use(express.json());
app.use("/api/todos", require("./routes/todoRoutes"));
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });