const baseURL = process.env.REACT_APP_BACKEND_URL;

const apiCalls = {
  singnUP: {
    url: `${baseURL}/api/signup`,
    method: "post",
  },
  login: {
    url: `${baseURL}/api/login`,
    method: "post",
  },
  active_user: {
    url: `${baseURL}/api/user-details`,
    method: "get",
  },
  logout: {
    url: `${baseURL}/api/user-logout`,
    method: "get",
  },
  resetPassword: {
    url: `${baseURL}/api/reset-password`,
    method: "post",
  },
  allUser: {
    url: `${baseURL}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${baseURL}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${baseURL}/api/upload-product`,
    method: "post",
  },
  allProducts: {
    url: `${baseURL}/api/all-products`,
    method: "get",
  },
  updateProduct: {
    url: `${baseURL}/api/update-product`,
    method: "post",
  },
  categoryList: {
    url: `${baseURL}/api/category-list`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${baseURL}/api/category-product`,
    method: "post",
  },
  singleProductDetails: {
    url: `${baseURL}/api/product-details`,
    method: "post",
  },
  productAddToCart: {
    url: `${baseURL}/api/add-to-cart`,
    method: "post",
  },
  countCartProducts: {
    url: `${baseURL}/api/count-cart-products`,
    method: "get",
  },
  viewCartProducts: {
    url: `${baseURL}/api/view-cart-products`,
    method: "get",
  },
  updateCartProduct: {
    url: `${baseURL}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${baseURL}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${baseURL}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${baseURL}/api/filter-product`,
    method: "post",
  },
  payment: {
    url: `${baseURL}/api/checkout`,
    method: "post",
  },
  orders: {
    url: `${baseURL}/api/order-list`,
    method: "get",
  },
  allOrders: {
    url: `${baseURL}/api/all-orders`,
    method: "get",
  },
};

export default apiCalls;
