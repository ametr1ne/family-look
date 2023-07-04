const uuid = require("uuid");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductController {
  async create(req, res, next) {
    try {
      const { name, price, description, categoryId, collectionId, info } = req.body;
      const { coverImg } = req.files;
      let fileName = uuid.v4() + ".jpg";

      coverImg.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        price,
        description,
        categoryId,
        collectionId,
        coverImg: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          })
        );
      }

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async remove(req, res, next) {
    let { id } = req.query;

    if (!id) {
      next(ApiError.badRequest("Не указан id"));
    }

    const removed = Product.destroy({ where: { id } });
    const productInfo = ProductInfo.destroy({ where: { productId: id } });

    return res.json(removed);
  }
  async getAll(req, res) {
    let { categoryId, collectionId, limit, page } = req.body;
    page = page || 1;
    limit = limit || 10;

    let offset = page * limit - limit;

    let products;
    if (!categoryId && !collectionId) {
      products = await Product.findAndCountAll({ limit, offset });
    }
    if (categoryId && !collectionId) {
      products = await Product.findAndCountAll({ where: { categoryId }, limit, offset });
    }
    if (!categoryId && collectionId) {
      products = await Product.findAndCountAll({ where: { collectionId }, limit, offset });
    }
    if (categoryId && collectionId) {
      products = await Product.findAndCountAll({
        where: { categoryId, collectionId },
        limit,
        offset,
      });
    }
    return res.json(products);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: "info" }],
    });
    return res.json(product);
  }
  async update(req, res, next) {
    try {
      let { id, name, price, description, categoryId, collectionId, materials, info } = req.body;

      materials = materials.split(",");

      const files = req.files;

      let coverImg = null;

      if (files) {
        coverImg = files.coverImg;
      }

      let product;

      if (coverImg) {
        let fileName = uuid.v4() + ".jpg";

        coverImg.mv(path.resolve(__dirname, "..", "static", fileName));

        product = await Product.update(
          {
            name,
            price,
            categoryId,
            collectionId,
            description,
            materials,
            coverImg: fileName,
          },
          { where: { id } }
        );
      } else {
        product = await Product.update(
          {
            name,
            price,
            categoryId,
            description,
            materials,
            collectionId,
          },
          { where: { id } }
        );
      }

      // if (info) {
      //   info = JSON.parse(info);
      //   info.forEach((i) =>
      //     ProductInfo.create({
      //       title: i.title,
      //       description: i.description,
      //       productId: product.id,
      //     })
      //   );
      // }

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProductController();
