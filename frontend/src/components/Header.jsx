import React, { useContext, useEffect, useState } from "react";
import Logo from "../assest/ShoppingLogo.png";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiCalls from "../helpers/apiCalls";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../helpers/role";
import Context from "../context/context";

const Header = () => {
  const user = useSelector((state) => state.user.activeUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.get("q") || "";
  const [search, setSearch] = useState(searchQuery);

  const context = useContext(Context);

  const handleLogout = async () => {
    const dataResponse = await fetch(apiCalls.logout.url, {
      method: apiCalls.logout.method,
      credentials: "include",
    });

    const actualData = await dataResponse.json();

    if (actualData.success) {
      toast.success(actualData.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (actualData.error) {
      toast.error(actualData.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  return (
    <header className="w-full h-20 bg-white sticky top-0 left-0 right-0 z-40 will-change-transform transform translateZ-0 ">
      <div className="h-full container mx-auto flex items-center justify-between px-2 lg:px-8">
        {/* Logo Image */}
        <div className="">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" width="90" height={"60"} />
          </Link>
        </div>

        {/* Search Input */}
        <div className="hidden w-full max-w-sm md:flex items-center justify-between border rounded-full focus-within:shadow pl-2 ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg text-white min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full">
            <GrSearch />
          </div>
        </div>

        {/*User, Cart, Login */}
        <div className="flex items-center gap-5 md:gap-7">
          {/*User Icon */}
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer "
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white  bottom-0 top-10 h-fit p-2 shadow-lg rounded z-20 ">
                <nav className="flex flex-col justify-center items-center">
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-slate-100  p-2 rounded cursor-pointer "
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hover:bg-slate-100 p-2 rounded cursor-pointer "
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    Orders
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {/*Cart Icon */}
          {user?._id && (
            <Link to={"/cart"} className="text-2xl cursor-pointer relative ">
              <span>
                <FaShoppingCart />
                <div className="bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3 ">
                  <p className="text-sm">{context?.cartProductCount}</p>
                </div>
              </span>
            </Link>
          )}

          {/*Login Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
