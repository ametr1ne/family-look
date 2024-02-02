const ApiError = require("../error/ApiError");
const { Order, OrderProduct, OrderStatus, PaymentStatus } = require("../models/models");

class OrderController {
  async create(req, res, next) {
    try {
      const { userId, products } = req.body;

      if (!userId || !products) {
        next(ApiError.badRequest("Не удалось получить обязательные параметры"));
      } else {
        const order = await Order.create({
          userId: userId,
          orderStatusId: 1,
          paymentStatusId: 1,
        });

        products.map(async (product) => {
          await OrderProduct.create({
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
    const { id, orderStatusId } = req.body;

    if (!id) {
      next(ApiError.badRequest("Не указан id"));
    }

    if (!orderStatusId ) {
      next(ApiError.badRequest("Не были переданы orderStatusId или paymentStatusId"));
    }

    const order = await Order.update({ orderStatusId }, { where: { id } });

    return res.json(order);
  }

  async getAll(req, res, next) {
    const orders = await Order.findAndCountAll({
      attributes: {
        exclude: ["paymentStatusId", "orderStatusId"],
      },
      include: [
        { model: PaymentStatus, as: "payment_status" },
        { model: OrderStatus, as: "order_status" },
      ],
      order: [["createdAt", "ASC"]],
    });
    return res.json(orders);
  }

  async getUserOrders(req, res, next) {
    const { id } = req.params;
    if (!id) {
      next(ApiError.badRequest("Не передан id"));
    }

    const orders = await Order.findAndCountAll({
      where: { userId: id },
    });

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

  async createStatus(req, res, next) {
    try {
      const { name, multipleName, showInDesk, color } = req.body;

      if (!name || !multipleName || !showInDesk || !color) {
        next(ApiError.badRequest("Не удалось получить обязательные параметры"));
      } else {
        const status = await OrderStatus.create({
          name,
          multipleName,
          showInDesk,
          color,
        });

        return res.json(status);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getStatuses(req, res, next) {
    try {
      const orders = await OrderStatus.findAll({
        order: [
          ["id", "ASC"],
          [{ model: Order, as: "orders" }, "createdAt", "DESC"],
        ],
        include: {
          model: Order,
          as: "orders",
          attributes: {
            exclude: ["paymentStatusId", "orderStatusId"],
          },
          include: [
            { model: PaymentStatus, as: "payment_status" },
            { model: OrderStatus, as: "order_status" },
          ],
        },
      });
      return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createPaymentStatus(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        next(ApiError.badRequest("Не удалось получить обязательные параметры"));
      } else {
        const status = await PaymentStatus.create({
          name,
        });

        return res.json(status);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OrderController();
