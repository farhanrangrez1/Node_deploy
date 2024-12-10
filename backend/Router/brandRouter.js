const express =require("express")
const {protect} =require("../Middlewar/authMiddlewares")  
const upload = require("../Middlewar/Multer"); 
const { brandCreate, brandAll, brandDelete, brandUpdate } = require("../Controller/brandController");

const router = express.Router()

router.post("/brandCreate",protect,upload.single("image"),brandCreate);
router.get("/bannersAll",protect,brandAll);
router.delete("/:id",protect,brandDelete)
router.put("/:id", upload.single("image"),brandUpdate);

module.exports = router