require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/routes");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening: ${PORT}`));
