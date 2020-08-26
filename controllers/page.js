const express = require("express");
const path = require("path");
const root_dir = path.dirname(require.main.filename)


exports.index=function(req,res){
    res.sendFile(path.join(root_dir + "/views/index.html"))
}
