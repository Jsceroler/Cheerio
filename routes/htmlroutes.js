const db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Article.find({})
            .lean()
            .then(function (data) {
                res.render("index", {
                    message: "News Below",
                    article: data,
                    nothing: "You should click the button for articles",
                });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/saved", function (req, res) {
        db.Article.find({ saved: true })
            .lean()
            .then(function (data) {
                res.render("saved", {
                    message: "Saved",
                    saved: data,
                    nothing: "There are no saved articles right now :c",
                });
            });
    });
};