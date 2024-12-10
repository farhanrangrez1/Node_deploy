const express =require("express")
const {protect} =require("../Middlewar/authMiddlewares")  
const upload = require("../Middlewar/Multer"); 
const { subCtegoryCreate, subcategoryAll, subcategoryUpdate, subcategoryDelete } = require("../Controller/subCategoryController");

const router = express.Router()

router.post("/:id",protect,upload.single("image"),subCtegoryCreate);
router.get("/subcategoryAll",subcategoryAll);
router.put("/:id", upload.single("image"),subcategoryUpdate);
router.delete("/:id",protect,subcategoryDelete)

module.exports = router