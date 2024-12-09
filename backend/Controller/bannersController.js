const Banners = require("../Model/bannersModel");
const asynchandler = require("express-async-handler");

const bannerss = asynchandler(async (req, res) => {
  const { name } = req.body;
  // const image = req.file?.path;
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

module.exports = { bannerss };
