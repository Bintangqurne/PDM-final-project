const express = require("express")
const controllerProduct = require("../controllers/controllerProduct")
const router = express.Router()

router.get('/pub/product', controllerProduct.productPublic);
router.get('/pub/product/:id', controllerProduct.productById);

module.exports = router