const express = require("express");
const router = express.Router();
const puppeteer = require('puppeteer');
const lib = require("../lib");


exports.getOneProduct=async function(req,res){
    const browser = await lib.browser.init();
    const results = await lib.crawlOneProduct(browser, req.body.url);
    await lib.browser.close(browser);
    res.send(results)
}
exports.getLinkProducts=async function(req,res){
    const browser = await lib.browser.init();
    const results = await lib.crawlLinkProducts(browser, req.body.url);
    await lib.browser.close(browser);
    res.send(results)
}