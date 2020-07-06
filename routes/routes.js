const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("https://bleedingcool.com/tag/jojos-bizarre-adventure/").then(function (response) {
  const $ = cheerio.load(response.data);
  
 
    $("article").each(function(i,element){
    
        let result={};
        result.title=$(this).find(".front-page-entry-title").children("a").text();
        result.link=$(this).find(".front-page-entry-title").children("a").attr("href");
        result.image=$(this).find(".post-thumbnail").children("a").find("img").attr("data-opt-src");
      db.Article.findOne({ title: result.title }, function (
        err,
        found
    ) {
        if (err) {
            console.log(err);
        }
        if (found) {
            console.log("This has been scraped");
        } else {
            db.Article.create(result)
                .then(function (dbArticle) {})
                .catch(function (err) {
                    console.log(err);
                });
        }
    });
    });
    res.redirect("/");
  });

   

});

    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate(
                    { _id: req.params.id },
                    {$push: { note: dbNote._id }},
                    { new: true }
                );
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.put("/articles/:id", function (req, res) {
        db.Article.updateOne({ _id: req.params.id }, { saved: req.body.saved })
            .populate("note")
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};