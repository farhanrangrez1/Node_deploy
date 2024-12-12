const express =require("express");
const { productsCreate, productsAll, productsDelete, productsUpdate, productsSingle } = require("../Controller/productsController");
const {protect} =require("../Middlewar/authMiddlewares")  
const upload = require("../Middlewar/Multer"); 


const router = express.Router()

router.post("/productsCreate",upload.single("image"),productsCreate);

router.get("/productsAll",productsAll);
router.put("/:id", upload.single("image"), productsUpdate);
router.delete("/:id",protect,productsDelete)
router.get("/:id",protect,productsSingle)

module.exports = router