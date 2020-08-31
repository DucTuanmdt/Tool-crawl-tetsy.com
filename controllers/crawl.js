const path = require("path");
const fs = require('fs-extra');
const services = require("../services");
const root_dir = path.dirname(require.main.filename)

exports.getOneProduct = async function (req, res) {
    const browser = await lib.browser.init();
    const results = await lib.crawlOneProduct(browser, req.body.url);
    await lib.browser.close(browser);
    res.send(results)
}

exports.getLinkProducts = async function (req, res) {
    const browser = await lib.browser.init();
    const results = await lib.crawlLinkProducts(browser, req.body.url);
    await lib.browser.close(browser);
    res.send(results)
}

exports.crawlAllProduct = async function (req, res) {
    res.send(true)
    console.time("TimeCrawl")
    const timeBegin = Date.now();
    const listAllProduct = [];
    const listLinkCategory = lib.generateListCategoryUrls(req.body.url, Number(req.body.pageStart), Number(req.body.pageEnd));
    const browser = await lib.browser.init();

    // quantity of page product-detail run together at the same time
    const quantity = Number(req.body.quantity || 5);
    const fileName = req.body.fileName;
    let countPageCrawled = 0;
    let globalCount = 0;

    const listCategoryPage = [];
    if (listLinkCategory.length > 0) {
        const res = await lib.crawlLinkProducts(browser, listLinkCategory[0]);
        listCategoryPage.push(res);
        lib.getRemainLinkProduct(browser, listCategoryPage, listLinkCategory);
    }

    for (const { category, linkProduct } of listCategoryPage) {

        let index = 0;
        while (index < linkProduct.length) {
            let res = await crawlParallel(linkProduct, index, quantity)
            res = res.filter(v => v !== null).map(v => {
                v.Category = category;
                return v;
            })
            index += quantity;
            listAllProduct.push(...res)
        }
        countPageCrawled++;

        console.log("Finish page ", countPageCrawled)
        services.socket.send(fileName, "done-page", {
            page: countPageCrawled
        });
    }
    await lib.browser.close(browser);

    console.timeEnd("TimeCrawl")
    const timeEnd = Date.now();
    const timeSpent = timeEnd - timeBegin;
    console.log("Time exec: ", timeSpent)

    // write to json
    const filePath = path.join(root_dir + "/export/" + fileName + ".json")
    try {
        await fs.outputJson(filePath, listAllProduct)
    } catch (err) {
        console.error(err)
    }

    async function crawlParallel(listLink, currIndex, quantity) {
        const setLink = listLink.slice(currIndex, currIndex + quantity);
        let products = setLink.map(async (link) => await lib.crawlOneProduct(browser, link))
        let results = [];
        for (const product of products) {
            results.push(await product);
            console.log("Product - ", ++globalCount);
        }
        return results;
    }

    await lib.createCSVFileFromJsonFile(fileName)
    services.socket.send(fileName, "done", {
        fileName, 
        timeSpent,
        products: globalCount
    });

}