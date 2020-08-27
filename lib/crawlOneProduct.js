module.exports = async function (browser, url) {
    // console.log("crawlOneProduct - URL: ", url)
    try {
        const page = await lib.browser.createNewPage(browser, url);

        const result = await page.evaluate(() => {
            const nameEl = document.querySelector("h1.wt-text-body-03.wt-line-height-tight.wt-break-word.wt-mb-xs-1") || {};
            const shopNameEl = document.querySelector("a.wt-text-link-no-underline > span") || {};
            const descriptionEl = document.querySelector("div[id='wt-content-toggle-product-details-read-more'] > p") || {};
            const priceEl = document.querySelector("div.wt-display-flex-xs.wt-align-items-center > p.wt-text-title-03.wt-mr-xs-2") || {};
            const tagsEl = [...document.querySelectorAll("div#wt-content-toggle-tags-read-more a")];
            const imgsEl = [...document.querySelectorAll("img.display-none.wt-max-width-full")];
            if (priceEl.innerText)
                return {
                    Name: nameEl.innerText,
                    ShopName: shopNameEl.innerText,
                    Description: descriptionEl.innerText,
                    Price: priceEl.innerText,
                    Tags: tagsEl.map(v => v.innerText).join(","),
                    Images: imgsEl.map(v => v.src)
                }

            return null;
        });
        result.Price = utils.formatPrice(result.Price);
        result.Images = result.Images.map(v => utils.formatUrlImage(v)).join(",")

        page.close();
        // console.log("End product")

        return result
    } catch (e) {
        console.log("Error crawl product-detail: ", url, "\n", e)
        return null;
    }
}