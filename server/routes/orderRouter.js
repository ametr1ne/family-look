const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", authMiddleware, orderController.create);
router.patch("/", checkRoleMiddleware("ADMIN"), orderController.update);
router.get("/", orderController.getAll);
router.get("/products/:id", orderController.getOrderProducts);
router.get("/user/:id", orderController.getUserOrders);

module.exports = router;
