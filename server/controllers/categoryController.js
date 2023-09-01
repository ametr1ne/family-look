const { Category, Product } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async create(req, res, next) {
    const { name } = req.body;
    if (!name || name.length < 1) {
      next(ApiError.badRequest("Укажите название категории"));
    }
    const candidate = await Category.findOne({ where: { name } });
    if (candidate) {
      return next(ApiError.badRequest("Такая категория уже существует"));
    }
    const category = await Category.create({ name });
    return res.json(category);
  }

  async update(req, res, next) {
    const { id, name } = req.body;
    if (!id || !name) {
      next(ApiError.badRequest("Не указан id или значение"));
    }
    const category = await Category.update({ name }, { where: { id } });
    return res.json(category);
  }

  async delete(req, res, next) {
    const { id } = req.query;
    if (!id) {
      next(ApiError.badRequest("Не указан id"));
    }
    // todo: delete category from all products
    const products = await Product.findAll({ where: { categoryId: id } });

    products.map(async (item) => {
      await Product.update({ categoryId: null }, { where: { id: item.id } });
    });

    const category = await Category.destroy({ where: { id } });
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}

module.exports = new CategoryController();
