const path = require("path");
const fs = require('fs-extra')
const root_dir = path.dirname(require.main.filename)
const converter = require('json-2-csv');

module.exports = async function createCSVFileFromJsonFile(fileName) {
    const filePath = path.join(root_dir + "/export/");
    try {
        const fileData = await fs.readJson(filePath + fileName + ".json")
        converter.json2csv(fileData, (err, csv) => {
            if (err) {
                console.error("Err", err)
                throw err;
            }

            // write CSV to a file
            fs.writeFileSync(filePath + fileName + ".csv", csv);
            console.log("Create csv successful");

        });
    } catch (err) {
        console.error("Can not creare file csv:", err)
    }
}