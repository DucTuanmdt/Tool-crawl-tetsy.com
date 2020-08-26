const express = require("express");
const router = express.Router();
const puppeteer = require('puppeteer');


exports.getOneProduct=async function(req,res){
    const results = await lib.crawlOneProduct(req.body.url);
    res.send(results)
}