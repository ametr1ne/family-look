const Router = require("express");
const router = new Router();
const materialController = require("../controllers/materialController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("ADMIN"), materialController.create);
router.get("/", materialController.getAll);
router.get("/:id", materialController.getOne);

module.exports = router;
