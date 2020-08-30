module.exports = async function (browser, url) {
    try {

        // console.log("crawlLinkProducts - URL: ", url)
        const page = await lib.browser.createNewPage(browser, url);

        const results = await page.evaluate(() => {
            let categoryEl = document.querySelector("div.float-left > h1") || {}
            let listProductEl = [...document.querySelectorAll("div.js-merch-stash-check-listing > a")]
            if (listProductEl.length < 1) {
                listProductEl = [...document.querySelectorAll("li.js-merch-stash-check-listing.block-grid-item.v2-listing-card > a")]
            }

            return {
                category: categoryEl.innerText,
                linkProduct: listProductEl.map(v => v.href)
            }
        });
        page.close();
        // console.log("End crawlLinkProduct")

        return results
    } catch (e) {
        console.log("Error crawl link product: ", url, "\n", e)
        return {
            category: "",
            linkProduct: []
        };
    }
}