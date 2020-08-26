const express = require("express");
const router = express.Router();
const puppeteer = require('puppeteer');

async function crawlOneProduct(url) {
    console.log("URL", url)
    const browser = await puppeteer.launch();
    console.log("Browser opened")
    const page = await browser.newPage();
    page.setViewport({
        width: 1920,
        height: 1080
    });
    // set user-agent to bypass capcha
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36');
    await page.goto(url);
    console.log("Page loaded")
    // register console.log to page.evaluate
    page.on('console', consoleObj => console.log(consoleObj.text()));

    const results = await page.evaluate(() => {
        const nameEl = document.querySelector("h1.wt-text-body-03.wt-line-height-tight.wt-break-word.wt-mb-xs-1") || {};
        const descriptionEl = document.querySelector("div[id='wt-content-toggle-product-details-read-more'] > p") || {};
        const priceEl = document.querySelector("div.wt-display-flex-xs.wt-align-items-center > p.wt-text-title-03.wt-mr-xs-2") || {};
        const tagsEl = [...document.querySelectorAll("div#wt-content-toggle-tags-read-more a")];
        const imgsEl = [...document.querySelectorAll("img.display-none.wt-max-width-full")];


        return {
            Name: nameEl.innerText,
            Description: descriptionEl.innerHTML,
            Price: priceEl.innerText,
            Tags: tagsEl.map(v => v.innerText).join(","),
            Images: imgsEl.map(v => v.src).join(",")
        }
    });
    console.log("End", results)
    await browser.close();
    console.log("Browser closed")

    return results
}

// POST /data
router.post("/", async function (req, res) {
    const results = await crawlOneProduct(req.body.url);
    res.send(results)
})

module.exports = router;