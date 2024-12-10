const express =require("express")
const {protect} =require("../Middlewar/authMiddlewares")  
const upload = require("../Middlewar/Multer"); 
const { brandCreate, brandAll, brandDelete, brandUpdate } = require("../Controller/brandController");

const brand = express.Router()

brand.post("/brandCreate",protect,upload.single("image"),brandCreate);
brand.get("/brandAll",protect,brandAll);
brand.delete("/:id",protect,brandDelete)
brand.put("/:id", upload.single("image"),brandUpdate);

module.exports = brand