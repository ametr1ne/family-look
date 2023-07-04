const ApiError = require("../error/ApiError");
const { Order, OrderProduct } = require("../models/models");

class OrderController {
  async create(req, res, next) {
    try {
      const { userId, products } = req.body;

      if (!userId || !products) {
        next(ApiError.badRequest("Не удалось получить обязательные параметры"));
      } else {
        const order = await Order.create({
          userId: userId,
          paymentStatus: "pending",
          workingStatus: "new",
        });

        products.map(async (product) => {
          const orderProduct = await OrderProduct.create({
            orderId: order.id,
            productId: product.productId,
            size: product.size,
            height: product.height,
            description: product.description,
          });
        });

        return res.json(order);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    const { id, workingStatus, paymentStatus } = req.body;

    if (!id) {
      next(ApiError.badRequest("Не указан id"));
    }

    if (!workingStatus && !paymentStatus) {
      next(ApiError.badRequest("Нечего обновлять"));
    }

    const order = await Order.update({ workingStatus, paymentStatus }, { where: { id } });

    return res.json(order);
  }

  async getAll(req, res, next) {
    const orders = await Order.findAndCountAll();
    return res.json(orders);
  }

  async getUserOrders(req, res, next) {
    const { id } = req.params;
    if (!id) {
      next(ApiError.badRequest("Не передан id"));
    }

    const orders = await Order.findAndCountAll({ where: { userId: id } });

    return res.json(orders);
  }

  async getOrderProducts(req, res, next) {
    const { id } = req.params;
    if (!id) {
      next(ApiError.badRequest("Не был передан id"));
    }

    const products = await OrderProduct.findAll({
      where: {
        orderId: id,
      },
    });

    return res.json(products);
  }
}

module.exports = new OrderController();
