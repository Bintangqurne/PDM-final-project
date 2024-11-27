const express = require("express");
const router = express.Router()
const routerPub = require("./publik");
const controllerProduct = require("../controllers/controllerProduct");

router.use(routerPub)

router.post("/product", controllerProduct.createProduct);
router.delete("/product/:id", controllerProduct.deleteProduct);
router.patch("/product/:id", controllerProduct.updateProduct);



module.exports = router