const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userLoginController = require("../controller/user/userLogin");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUser = require("../controller/user/allUser");
const updateUserRole = require("../controller/user/updateUserRole");
const UploadProductController = require("../controller/product/uploadProduct");
const getAllProductsController = require("../controller/product/getAllProducts");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryList = require("../controller/product/getCategoryList");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getSingleProductDetails = require("../controller/product/getSingleProuctDetails");
const addToCartConroller = require("../controller/user/addToCartController");
const countCartProducts = require("../controller/user/countCartProducts");
const viewCartproducts = require("../controller/user/viewCartProducts");
const updateCartProductQuantity = require("../controller/user/updateCartProductQuantity");
const deleteCartProduct = require("../controller/user/deleteCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProduct = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhooks = require("../controller/order/webhooks");
const orderController = require("../controller/order/orderController");
const allOrderController = require("../controller/order/allOrderController");
const userResetPasswordController = require("../controller/user/userResetPassword");

//userApis
router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogout);
router.post("/reset-password", userResetPasswordController);

//admin panel
router.get("/all-user", authToken, allUser);
router.post("/update-user", authToken, updateUserRole);

//product api
router.post("/upload-product", authToken, UploadProductController);
router.get("/all-products", getAllProductsController);
router.post("/update-product", authToken, updateProductController);
router.get("/category-list", getCategoryList);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getSingleProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProduct);

// cart apis
router.post("/add-to-cart", authToken, addToCartConroller);
router.get("/count-cart-products", authToken, countCartProducts);
router.get("/view-cart-products", authToken, viewCartproducts);
router.post("/update-cart-product", authToken, updateCartProductQuantity);
router.post("/delete-cart-product", authToken, deleteCartProduct);

//payment and checkout
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhooks); // /api/webhook
router.get("/order-list", authToken, orderController);
router.get("/all-orders", authToken, allOrderController);

module.exports = router;
