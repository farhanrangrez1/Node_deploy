const Banners = require("../Model/bannersModel");
const asynchandler = require("express-async-handler");

const bannerss = asynchandler(async (req, res) => {
  const { name } = req.body;
  // const image = req.file?.path;
  
  // ye code deploy ment ka hai 
  const image = `${req.protocol}://${req.get("host")}/uploads/${req.file?.filename}`;

  if (!image || !name) {
    throw new Error("Please fill all details");
  }

  const banner = await Banners.create({
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



const bannerssAll = async (req, res) => {
  const bannerssAll = await Banners.find()
  if (bannerssAll === null) {
      res.status(404)
      throw new Error("bannerssAll Not Found")
  }
  res.json(bannerssAll)
}


const bannerssDelete = async (req, res) => {
  if (bannerssDelete) {
    const bannerssDelete = await Banners.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json("Delete Bannerss")
  } else {
    res.status(400).json({ message: "Not Delete Bannerss" })
  }
}


const bannerssUpdate = async (req, res) => {
  if (bannerssUpdate) {
      const bannerssUpdate = await address.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(bannerssUpdate)
  } else {
      res.status(400).json({ message: "Not Update Bannerss " })
  }
}

module.exports = { bannerss,bannerssAll,bannerssDelete,bannerssUpdate };
