const puppeteer = require('puppeteer');

exports.init = async function () {
    const browser = await puppeteer.launch();
    console.log("Browser opened")
    return browser;
}

exports.close = async function (browser) {
    if (browser) {
        await browser.close();
        console.log("Browser closed")
    } else {
        console.warn("Browser is not exist", browser)
    }
}

exports.createNewPage = async function (browser, url) {
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

    return page;
}

