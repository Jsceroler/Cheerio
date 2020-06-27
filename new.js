
const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://bleedingcool.com/tag/jojos-bizarre-adventure/").then(function (response) {
    const $ = cheerio.load(response.data);
    $("article").each(function(i,element){
        let result={};
        result.title=$(this).find(".front-page-entry-title").children("a").text();
        result.link=$(this).find(".front-page-entry-title").children("a").attr("href");
        result.image=$(this).find(".post-thumbnail").children("a").find("img").attr("data-opt-src");
        console.log(result);

    });
  
});