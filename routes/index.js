var express = require('express');
var router = express.Router();

var http = require('https');
var parseString = require("xml2js").parseString;

router.get("/",(req, res, next) =>{
  var opt = {
    host : "news.google.com",
    port : 443,
    path : "/rss/search?q=%e8%8b%b1%e8%ad%b0%e4%bc%9a&hl=ja&gl=JP&ceid=JP:ja",
  };

  http.get(opt, (res2) =>{
    var body = "";
    res2.on("data",(data) =>{
      body += data;
    });
    res2.on("end",()=>{
      parseString(body.trim(),(err,result) =>{
        var data ={
          title : "sample",
          content : result.rss.channel[0].item
        };
        res.render("index",data);
      });
    });
  });
});
module.exports = router;
