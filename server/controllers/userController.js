const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Cart } = require("../models/models");

const generateJwt = (id, email, name, role, cart) => {
  return jwt.sign({ id, email, name, role, cart }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, name, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("Пользователь с таким email уже существует"));
    }
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ email, name, role, password: hashPassword });
    const cart = await Cart.create({ userId: user.id });

    const token = generateJwt(user.id, user.email, user.name, user.role, cart.id);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }

    const cart = await Cart.findOne({ where: { userId: user.id } });

    if (!cart) {
      next(ApiError.internal("Не удалось найти корзину для пользователя"));
    }

    const token = generateJwt(user.id, user.email, user.name, user.role, cart.id);
    return res.json({ token });
  }

  async checkAuth(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.name,
      req.user.role,
      req.user.cart
    );
    return res.json({ token });
  }

  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;

    let offset = page * limit - limit;

    const users = await User.findAndCountAll({ limit, offset });

    return res.json(users);
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    if (!id) {
      next(ApiError.badRequest("Не передан id"));
    }

    const user = await User.findOne({
      where: {
        id,
      },
    });

    return res.json(user);
  }
}

module.exports = new UserController();
