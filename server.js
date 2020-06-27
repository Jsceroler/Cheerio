var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var app = express();
//scrape tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
require("./routes/routes")(app);
require("./routes/htmlroutes")(app);
const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,

});


app.listen(PORT, function() {
    console.log(`Running on http://localhost:${PORT}`);
});