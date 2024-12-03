const express = require("express");
const ControllerHistoryCustomer = require("../controllers/controllerHistory");
const authentication = require("../middleware/authentication");
const router = express.Router()

router.use(authentication);
router.get('/customer/product', ControllerHistoryCustomer.productCustomer)
router.get('/customer/product/:Id', ControllerHistoryCustomer.historyById)
router.get('/customer/history', ControllerHistoryCustomer.history)
router.post('/customer/history/:productId', ControllerHistoryCustomer.historyProduct)
router.delete('/customer/history/:historyId', ControllerHistoryCustomer.deleteHistory)

module.exports = router