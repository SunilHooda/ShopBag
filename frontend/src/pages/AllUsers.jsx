import React, { useEffect, useState } from "react";
import apiCalls from "../helpers/apiCalls";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";
import ChangeUserRole from "../components/changeUserRole";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const activeAdmin = useSelector((state) => state?.user?.activeUser);
  const [allUser, setAllUser] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const dataResponse = await fetch(apiCalls.allUser.url, {
      method: apiCalls.allUser.method,
      credentials: "include",
    });

    const actualData = await dataResponse.json();
    if (actualData.success) {
      setAllUser(actualData.data);
    }

    if (actualData.error) {
      toast.error(actualData.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4 overflow-x-auto md:overflow-x-visible userTable-wrapper ">
      <table className="w-full userTable min-w-[570px] lg:min-w-0">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allUser.map((el, index) => {
            return (
              <tr key={el?._id} className="h-10">
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td>
                  {activeAdmin?.email === el?.email ? (
                    <button className="bg-green-500 p-1 rounded-full cursor-not-allowed text-white ">
                      <FaDotCircle className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                      onClick={() => {
                        setUpdateUserDetails(el);
                        setOpenUpdateModal(true);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateModal && (
        <ChangeUserRole
          onClose={() => setOpenUpdateModal(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
