const express = require("express");
const upload = require("../Middlewar/Multer"); 
const { bannerss, bannerssAll, bannerssUpdate, bannerssDelete } = require("../Controller/bannersController");
const {protect} =require("../Middlewar/authMiddlewares")  

const router = express.Router();

router.post("/banners",protect,upload.single("image"),bannerss);
router.get("/bannersAll",protect,bannerssAll);
router.put("/:id",bannerssUpdate)
router.delete("/:id",bannerssDelete)


module.exports = router;
