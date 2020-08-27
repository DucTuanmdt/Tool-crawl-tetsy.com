
module.exports = async function (browser, listCategoryPage, listLinkCategory) {
    for (let i = 1; i < listLinkCategory.length; i++) {
        const res = await lib.crawlLinkProducts(browser, listLinkCategory[i]);
        listCategoryPage.push(res);
    }
}