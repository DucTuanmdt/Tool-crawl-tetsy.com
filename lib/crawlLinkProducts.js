
module.exports=async function(browser, url){
    console.log("URL", url)
    const page = await lib.browser.createNewPage(browser, url);

    const results = await page.evaluate(() => {
        let listProductEl = [...document.querySelectorAll("div.js-merch-stash-check-listing > a")]
        let categoryEl = document.querySelector("div.float-left > h1") || {}

        return {
            category: categoryEl.innerText,
            linkProduct: listProductEl.map(v => v.href)
        }
    });
    console.log("End crawlLinkProduct")

    return results
}