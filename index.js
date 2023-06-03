const express = require("express");
const app = express();
const port =  8080;
const bodyParser = require("body-parser");
const db = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.set('secretKey', "guruji")


app.get("/", (req, res) => {
  res.send("Hey, server is runnning ")
})

app.listen(port, () => {
  console.log("Server running on port " + port);
});



