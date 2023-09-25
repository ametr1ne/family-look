const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Cart = sequelize.define("cart", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CartProduct = sequelize.define("cart_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  size: { type: DataTypes.FLOAT, allowNull: true },
  height: { type: DataTypes.INTEGER, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  coverImg: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  materials: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Collection = sequelize.define("collection", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Material = sequelize.define("material", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, unique: false, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const ProductInfo = sequelize.define("product_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

// const ProductOption = sequelize.define("product_option", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING, allowNull: false },
//   // options: { type: DataTypes.ARRAY, allowNull: false },
// });

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const OrderProduct = sequelize.define("order_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  size: { type: DataTypes.FLOAT, allowNull: true },
  height: { type: DataTypes.INTEGER, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
});

const CategoryCollection = sequelize.define("category_collection", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const OrderStatus = sequelize.define("order_status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  multipleName: { type: DataTypes.STRING, allowNull: false },
  showInDesk: { type: DataTypes.BOOLEAN, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
});

const PaymentStatus = sequelize.define("payment_status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderProduct, { as: "products" });
OrderProduct.belongsTo(Order);

Cart.hasMany(CartProduct, { as: "products" });
CartProduct.belongsTo(Cart);

Material.hasMany(CartProduct);
CartProduct.belongsTo(Material);

Material.hasMany(OrderProduct);
OrderProduct.belongsTo(Material);

Category.hasMany(Product);
Product.belongsTo(Category);

Collection.hasMany(Product);
Product.belongsTo(Collection);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(CartProduct);
CartProduct.belongsTo(Product);

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

Category.belongsToMany(Collection, { through: CategoryCollection });
Collection.belongsToMany(Category, { through: CategoryCollection });

OrderStatus.hasMany(Order);
Order.belongsTo(OrderStatus);

PaymentStatus.hasMany(Order);
Order.belongsTo(PaymentStatus);

module.exports = {
  User,
  Cart,
  CartProduct,
  Product,
  Category,
  Collection,
  Rating,
  CategoryCollection,
  Order,
  OrderProduct,
  ProductInfo,
  Material,
  OrderStatus,
  PaymentStatus,
};
