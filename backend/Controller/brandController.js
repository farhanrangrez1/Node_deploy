const Brand = require("../Model/brandModel");
const asynchandler = require("express-async-handler");




const brandCreate =asynchandler(async (req, res) => {
    const { name } = req.body;
    const image = `${req.protocol}://${req.get("host")}/uploads/${req.file?.filename}`;
  
    if (!image || !name) {
      throw new Error("Please fill all details");
    }
    const banner = await Brand.create({
      images: image,
      name,
    });
  
    if (banner) {
      res.status(201).json({
        _id: banner._id,
        name: banner.name,
        images: banner.images,
      });
    } else {    
      res.status(500).json({ message: "Failed to create banner" });
    }
  });


  
const brandAll = async (req, res) => {
    const brandAll = await Brand.find()
    if (brandAll === null) {
        res.status(404)
        throw new Error("bannerssAll Not Found")
    }
    res.json(brandAll)
  }
  
  
  const brandDelete = async (req, res) => {
    if (brandDelete) {
      const brandDelete = await Brand.findByIdAndDelete(req.params.id, req.body);
      res.status(200).json("Delete  brand")
    } else {
      res.status(400).json({ message: "Not Delete  brand" })
    }
  }
  
 
  
  
const brandUpdate = async (req, res) => {
    try {
      const { name } = req.body; 
      const image = req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` 
        : undefined; 
  
      const updatedFields = {
        ...(name && { name }),
        ...(image && { images: image }),
      };
  
      const updatedCategory = await Brand.findByIdAndUpdate(
        req.params.id, 
        updatedFields, 
        { new: true } 
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category Not Found" });
      }
  
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: "Failed to Update Category", error: error.message });
    }
  };
  
module.exports = {brandCreate,brandAll,brandDelete,brandUpdate}