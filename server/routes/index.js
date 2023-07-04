const Router = require("express");

const router = new Router();

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const collectionRouter = require("./collectionRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const materialRouter = require("./materialRouter");

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/collection", collectionRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/material", materialRouter);

module.exports = router;
