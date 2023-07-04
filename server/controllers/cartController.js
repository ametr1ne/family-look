const ApiError = require("../error/ApiError");
const { CartProduct, Cart } = require("../models/models");

class CartController {
  async addToCart(req, res, next) {
    try {
      let { cartId, productId, size, height, description, materialId } = req.body;

      description = description || "";

      if (!cartId || !productId || !size || !height) {
        next(ApiError.badRequest("Не удалось получить обязательные параметры"));
      } else {
        const cartProduct = await CartProduct.create({
          cartId,
          productId,
          size,
          height,
          description,
          materialId,
        });

        return res.json(cartProduct);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async removeFromCart(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        next(ApiError.badRequest("Не указан id для удаления"));
      } else {
        const removedProduct = await CartProduct.destroy({ where: { id } });

        return res.json(removedProduct);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    const carts = await Cart.findAll();
    return res.json(carts);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const cart = await Cart.findOne({
      where: { id },
      include: { model: CartProduct, as: "products" },
    });
    return res.json(cart);
  }
}

module.exports = new CartController();
