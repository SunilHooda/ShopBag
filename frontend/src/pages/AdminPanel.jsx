import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../helpers/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.activeUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col md:flex-row">
      <aside className="bg-white min-h-full w-full  md:max-w-60 customShadow flex md:flex-col flex-row justify-between md:justify-start md:align-top px-2 md:p-2 ">
        <div className=" h-24 md:h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className=" w-16 h-16 md:w-20 md:h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm hidden md:block">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className="grid p-2 md:p-4 text-right md:text-left ">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
            <Link to={"all-orders"} className="px-2 py-1 hover:bg-slate-100">
              All Orders
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2 pb-0 ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
