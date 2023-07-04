const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("ADMIN"), productController.create);
router.patch("/", checkRoleMiddleware("ADMIN"), productController.update);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.delete("/", checkRoleMiddleware("ADMIN"), productController.remove);

module.exports = router;
