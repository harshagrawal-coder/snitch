import productmodel from "../model/products.model.js";
import { uploadFile } from "../services/storage.services.js";
export async function createProducts(req, res) {
  try {
    const { title, description, PriceAmount, priceCurrency } = req.body;

    const seller = req.user;

    const img = await Promise.all(
      req.files.map(async (file) => {
        // console.log("Uploading:", file.originalname);
        const uploaded = await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });

        // console.log("Uploaded:", uploaded);

        return {
          url: uploaded.url,
          alt: file.originalname,
        };
      }),
    );

    console.log("Images:", img);

    const products = await productmodel.create({
      title,
      description,
      price: {
        amount: Number(PriceAmount),
        currency: priceCurrency,
      },
      seller: seller._id,
      img,
    });

    // console.log("Product Created:", products._id);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getsellerProducts(req, res) {
  const seller = req.user;
  const products = await productmodel.find({ seller: seller._id });
  res.status(200).json({
    success: true,
    message: "product fetched successfully",
    products,
  });
}

export async function getAllProducts(req, res) {
  const products = await productmodel.find();
  return res.status(200).json({
    success: "true",
    message: "product fetched successfully",
    products,
  });
}
export async function getSingleProductDetail(req, res) {
  const { id } = req.params;
  try {
    const product = await productmodel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "product details fetched Successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
