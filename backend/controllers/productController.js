import mongoose from "mongoose";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      featured,
      active,
      search,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    if (active !== undefined) {
      filter.active = active === "true";
    }

    if (search) {
      filter.$text = {
        $search: search,
      };
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "error",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      slug,
      category,
      price,
      oldPrice,
      sku,
      media,
      colors,
      stock,
      specifications,
      featured,
      badge,
      active,
    } = req.body;

    if (!name?.ar && !name?.en) {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (!description?.ar && !description?.en) {
      return res.status(400).json({
        message: "Product description is required",
      });
    }

    if (!slug) {
      return res.status(400).json({
        message: "Product slug is required",
      });
    }

    if (!category || typeof category !== "string" || !category.trim()) {
      return res.status(400).json({
        message: "Product category is required",
      });
    }

    if (price === undefined || price === null || price === "") {
      return res.status(400).json({
        message: "Product price is required",
      });
    }

    const existingSlug = await Product.findOne({
      slug: slug.toLowerCase(),
    });

    if (existingSlug) {
      return res.status(409).json({
        message: "Product slug already exists",
      });
    }

    if (sku) {
      const existingSku = await Product.findOne({
        sku,
      });

      if (existingSku) {
        return res.status(409).json({
          message: "Product SKU already exists",
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      slug: slug.toLowerCase(),
      category: category.trim(),
      price,
      oldPrice,
      sku,
      media,
      colors,
      stock,
      specifications,
      featured,
      badge,
      active,
    });

    res.status(201).json({
      message: "You have added this product",
      product,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Slug or SKU already exists",
      });
    }

    res.status(500).json({
      message: "error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Product is not found",
      });
    }

    const productById = await Product.findById(id);

    if (!productById) {
      return res.status(404).json({
        message: "Product is not found",
      });
    }

    const reviews = await Review.find({
      product: id,
    })
      .populate(
        "user",
        "firstName lastName name username"
      )
      .sort({
        createdAt: -1,
      });

    const product = {
      ...productById.toObject(),
      reviews,
    };

    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "error",
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const productBySlug = await Product.findOne({
      slug: slug.toLowerCase(),
      active: true,
    });

    if (!productBySlug) {
      return res.status(404).json({
        message: "Product is not found",
      });
    }

    const reviews = await Review.find({
      product: productBySlug._id,
    })
      .populate(
        "user",
        "firstName lastName name username"
      )
      .sort({
        createdAt: -1,
      });

    const product = {
      ...productBySlug.toObject(),
      reviews,
    };

    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Product is not found",
      });
    }

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product is not found",
      });
    }

    const {
      name,
      description,
      slug,
      category,
      price,
      oldPrice,
      sku,
      media,
      colors,
      stock,
      specifications,
      featured,
      badge,
      active,
    } = req.body;

    if (
      category !== undefined &&
      (typeof category !== "string" || !category.trim())
    ) {
      return res.status(400).json({
        message: "Product category is invalid",
      });
    }

    if (slug) {
      const existingSlug = await Product.findOne({
        slug: slug.toLowerCase(),
        _id: {
          $ne: id,
        },
      });

      if (existingSlug) {
        return res.status(409).json({
          message: "Product slug already exists",
        });
      }
    }

    if (sku) {
      const existingSku = await Product.findOne({
        sku,
        _id: {
          $ne: id,
        },
      });

      if (existingSku) {
        return res.status(409).json({
          message: "Product SKU already exists",
        });
      }
    }

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (slug !== undefined) {
      updateData.slug = slug.toLowerCase();
    }

    if (category !== undefined) {
      updateData.category = category.trim();
    }

    if (price !== undefined) {
      updateData.price = price;
    }

    if (oldPrice !== undefined) {
      updateData.oldPrice = oldPrice;
    }

    if (sku !== undefined) {
      updateData.sku = sku;
    }

    if (media !== undefined) {
      updateData.media = media;
    }

    if (colors !== undefined) {
      updateData.colors = colors;
    }

    if (stock !== undefined) {
      updateData.stock = stock;
    }

    if (specifications !== undefined) {
      updateData.specifications = specifications;
    }

    if (featured !== undefined) {
      updateData.featured = featured;
    }

    if (badge !== undefined) {
      updateData.badge = badge;
    }

    if (active !== undefined) {
      updateData.active = active;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Product has been updated",
      product,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Slug or SKU already exists",
      });
    }

    res.status(500).json({
      message: "error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Product has not been found",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product has not been found",
      });
    }

    await Review.deleteMany({
      product: id,
    });

    res.status(200).json({
      message: `You have deleted ${
        deletedProduct.name.ar || deletedProduct.name.en
      }`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "error",
    });
  }
};