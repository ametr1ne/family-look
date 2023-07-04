const Router = require("express");
const router = new Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, cartController.addToCart);
router.get("/", cartController.getAll);
router.get("/:id", cartController.getOne);
router.delete("/product", authMiddleware, cartController.removeFromCart);
// router.get("/products", authMiddleware, cartController.getCartProducts);

module.exports = router;
