const express = require("express");
const router = express.Router()
const routerPub = require("./publik");
const routerCus = require("./customer");

const controllerProduct = require("../controllers/controllerProduct");
const controllerUser = require("../controllers/controllerUser");
const controllerHistory = require("../controllers/controllerHistoryPublik");
const authentication = require("../middleware/authentication");

router.use(routerPub)

router.post("/register", controllerUser.register);
router.post("/login", controllerUser.login);
router.post("/google-login", controllerUser.googleLogin)

router.use(authentication);
router.use(routerCus)
    
router.post("/product", controllerProduct.createProduct);
router.get("/product", controllerProduct.product);
router.get("/product/:id", controllerProduct.productById);
router.delete("/product/:id", controllerProduct.deleteProduct);
router.patch("/product/:id", controllerProduct.updateProduct);
router.get("/history", controllerHistory.history);
router.get("/history/:id", controllerHistory.historyById);
router.get("/history/:id", controllerHistory.deleteHistory)

module.exports = router