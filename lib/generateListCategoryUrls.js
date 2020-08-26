
module.exports = function (originUrl, pageStart, pageEnd) {
    const listUrl = [];
    let tempUrl = new URL(originUrl);
    const searchParams = tempUrl.searchParams;

    for (let i = pageStart; i <= pageEnd; i++) {
        searchParams.set("page", i);
        tempUrl.search = searchParams.toString();
        listUrl.push(tempUrl.toString());
    }

    return listUrl;
}