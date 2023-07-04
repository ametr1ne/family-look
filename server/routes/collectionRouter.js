const Router = require("express");
const router = new Router();
const collectionController = require("../controllers/collectionController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("ADMIN"), collectionController.create);
router.get("/", collectionController.getAll);

module.exports = router;
