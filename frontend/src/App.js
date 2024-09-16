import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import apiCalls from "./helpers/apiCalls";
import Context from "./context/context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const [cartProductCount, setCartProductCount] = useState(0);
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const responseData = await fetch(apiCalls.active_user.url, {
      method: apiCalls.active_user.method,
      credentials: "include",
    });

    const activeUserData = await responseData.json();
    if (activeUserData.success) {
      dispatch(setUserDetails(activeUserData.data));
    }
  };

  const fetchCartProductsCount = async () => {
    const responseData = await fetch(apiCalls.countCartProducts.url, {
      method: apiCalls.countCartProducts.method,
      credentials: "include",
    });

    const actualData = await responseData.json();

    setCartProductCount(actualData?.data?.count);
  };

  useEffect(() => {
    /* Fetching User Details on app load */
    fetchUserDetails();

    /* User Cart Product Counts */
    fetchCartProductsCount();
  }, []);
  return (
    <>
      <Context.Provider
        value={{ fetchUserDetails, cartProductCount, fetchCartProductsCount }}
      >
        <ToastContainer position="top-center" autoClose={1750} />
        <Header />
        <main className="min-h-[calc(100vh-152px)] md:min-h-[calc(100vh-129px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
