import express from "express";

import product from "./product.js";
import category from "./category.js";
import brand from "./brand.js";
import mehanizm from "./mehanizm.js";
import gender from "./gender.js";
import shape from "./shape.js";
import material from "./material.js";
import glass from "./glass.js";
import strap from "./strap.js";
import power from "./power.js";
import water from "./water.js";
import user from "./user.js";
import basket from "./basket.js";
import rating from "./rating.js";
import order from "./order.js";
import instagram from "./instagram.js";

const router = new express.Router();

router.use("/product", product);
router.use("/category", category);
router.use("/brand", brand);
router.use("/mehanizm", mehanizm);
router.use("/gender", gender);
router.use("/shape", shape);
router.use("/material", material);
router.use("/glass", glass);
router.use("/strap", strap);
router.use("/power", power);
router.use("/water", water);
router.use("/user", user);
router.use("/basket", basket);
router.use("/rating", rating);
router.use("/order", order);
router.use("/", instagram);

export default router;