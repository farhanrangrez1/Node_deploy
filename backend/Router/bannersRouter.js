const express = require("express");
const upload = require("../Middlewar/Multer"); 
const { bannerss } = require("../Controller/bannersController");
const {protect} =require("../Middlewar/authMiddlewares")  

const router = express.Router();

router.post("/banners",protect,upload.single("image"),bannerss);

module.exports = router;
