const express = require("express")
const controllerProduct = require("../controllers/controllerProduct");
const controllerHistory = require("../controllers/controllerHistory");
const router = express.Router()

router.get('/pub/product', controllerProduct.productPublic);
router.get('/pub/product/:id', controllerProduct.productById);
router.post(`/pub/history`, controllerHistory.historyProduct);

module.exports = router