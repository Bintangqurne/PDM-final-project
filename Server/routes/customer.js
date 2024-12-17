const express = require("express");
const ControllerHistoryCustomer = require("../controllers/controllerHistory");
const authentication = require("../middleware/authentication");
const controllerOrder = require("../controllers/controllerOrder");
const controllerProduct = require("../controllers/controllerProduct");
const PaymentController = require("../controllers/payment");
const router = express.Router()

router.use(authentication);
router.get('/customer/product', ControllerHistoryCustomer.productCustomer)
router.get('/customer/product/:id', controllerProduct.productById)
router.get('/customer/history', ControllerHistoryCustomer.history)
router.post('/customer/history/:productId', ControllerHistoryCustomer.historyProduct)
router.delete('/customer/history/:historyId', ControllerHistoryCustomer.deleteHistory)
router.get('/customer/history/:id', ControllerHistoryCustomer.historyById)
router.get('/customer/order', controllerOrder.getOrder)
router.get('/customer/order/:id', controllerOrder.getOrderById)
//! Midtrans
router.post("/payment/midtrans/token", PaymentController.getMidtransToken)
router.put("/payment/midtrans/success", PaymentController.updateSuccess)

module.exports = router