const express = require("express");
const router = express.Router();
const controller = require("../controllers/index")

// page render
router.get("/", controller.page.index)

// api crawl data
router.post("/data", controller.crawl.crawlAllProduct)



module.exports=router