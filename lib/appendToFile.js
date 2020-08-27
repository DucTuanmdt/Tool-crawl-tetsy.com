const fs = require('fs-extra')
let path = require("path")
const root_dir = path.dirname(require.main.filename)

/**
 *  fileName: name of file
 *  data: list data json, [{...obj}]
 *  output: true
 *  description: append data to file
 */


module.exports =async function(fileName, data) {
    const filePath = path.join(root_dir + `/export/${fileName}.json`);
    fs.readJson(filePath,async (err,fileData)=>{
        let newData=[]
        if(fileData){
            newData=fileData
        }
        newData = newData.concat(data)
        try{
            await fs.outputJSON(filePath, newData)
            console.log(`append data to file ${fileName} done`)
            return true
        }
        catch(err){
            console.log("Error when append to file", err)
            return false
        }
    })   
}