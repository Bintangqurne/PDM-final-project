const express = require("express")
const controllerProduct = require("../controllers/controllerProduct");
const controllerHistoryPublik = require("../controllers/controllerHistoryPublik");
const router = express.Router()

router.get('/pub/product', controllerProduct.productPublic);
router.get('/pub/product/:id', controllerProduct.productById);
router.post(`/pub/history`, controllerHistoryPublik.historyProductPub);

module.exports = router