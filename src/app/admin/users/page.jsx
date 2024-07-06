"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import queryStr from "query-string";

const tableHeader = [
  { label: "Name", align: "left" },
  { label: "Username", align: "left" },
  { label: "Email", align: "left" },
  { label: "Phone No", align: "left" },
  { label: "Role", align: "left" },
  { label: "Actions", align: "center" },
];

const Index = ({ users: initialUsers, start, end, total, page }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [users, setUsers] = useState(initialUsers);
  const [filterByName, setFilterByName] = useState({ fullname: "" });

  const pageCount = parseInt(page, 10);

  const searchInputHandler = (e) => {
    setFilterByName({ ...filterByName, [e.target.name]: e.target.value });
  };

  const deleteUser = async (id) => {
    try {
      if (window.confirm("Do you want to delete this user?")) {
        const res = await axios.delete(`/api/users/${id}`);
        if (res.status === 200) {
          toast.success("User deleted successfully!");
          fetchUserData();
        } else {
          toast.error("Failed to delete user.");
        }
      }
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const queryString = queryStr.stringify({
        name: filterByName.fullname,
        page: pageCount,
      });
      const { data } = await axios.get(`/api/users?${queryString}`);
      setUsers(data.message.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [pageCount, filterByName.fullname]);

  const openModal = (user) => {
    setModalData(user);
    setShowModal(true);
  };

  const closeModals = () => {
    setShowForm(false);
    setShowModal(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users", modalData);
      if (res.status === 200) {
        toast.success("User registered successfully!");
        router.refresh();
        fetchUserData();
        closeModals();
      } else {
        toast.error("Failed to register user.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full p-3">
        <div className="overflow-x-auto w-full border rounded-2xl">
          <div className="bg-white p-4 flex justify-between items-center flex-col gap-3 lg:flex-row">
            <h2 className="text-xl font-semibold">
              All <span className="text-indigo-600">Users</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="search"
                  name="fullname"
                  value={filterByName.fullname}
                  onChange={searchInputHandler}
                  placeholder="Search here..."
                  className="relative border border-gray-200 text-gray-400 text-sm pl-3 px-2 py-[6px] lg:w-[12vw] w-[25vw] rounded-full focus:ring-2 transition-colors focus:outline-none focus:text-gray-400"
                />
                {loading && (
                  <i className="fa-solid fa-spinner absolute top-[30%] right-3 text-xs text-gray-500"></i>
                )}
              </div>
              <i
                onClick={() => setShowForm(true)}
                className="bx bx-plus rounded-full h-8 w-8 flex items-center pt-2 pl-[6px] justify-center bg-orange-500 text-white transition-all duration-150 cursor-pointer text-xl"
              ></i>
            </div>
          </div>
          <table className="text-sm min-w-[1000px] w-full text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                {tableHeader.map((value, index) => (
                  <th
                    scope="col"
                    key={index}
                    className={`px-6 py-3 text-${value.align}`}
                  >
                    {value.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr key={i} className="bg-white border-b border-gray-100">
                  <td
                    scope="row"
                    className="px-6 flex border-0 items-center py-2 font-medium text-gray-600 whitespace-nowrap"
                  >
                    <div className="w-10 h-10 mr-3 border border-gray-100 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-contain"
                        src={user.photo || "https://github.com/scriptwithahmad/u-shop-2.0/blob/main/public/user.jpeg?raw=true"}
                        alt="User Image"
                      />
                    </div>
                    {user.fullName}
                  </td>
                  <td className="px-6 py-2">{user.userName}</td>
                  <td className="px-6 py-2">{user.email}</td>
                  <td className="px-6 py-2">{user.phone}</td>
                  <td className="px-6 py-2">
                    <span
                      className={`px-3 rounded-full font-light ${
                        user.isAdmin 
                          ? "bg-purple-50 text-purple-400"
                          : "bg-pink-50 text-pink-400"
                      }`}
                    >
                      {user.isAdmin  ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-2 text-lg text-center">
                    <button onClick={() => openModal(user)}>
                      <i className="bx bx-low-vision px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"></i>
                    </button>
                    <button onClick={() => deleteUser(user._id)}>
                      <i className="bx bx-trash px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-orange-400 text-sm"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end pr-14 gap-5 w-full py-5 border-b border-gray-100 bg-gray-50">
            <span className="whitespace-nowrap flex items-center justify-center text-sm text-slate-500">
              {start} to {end} of {total}
            </span>
            <div className="flex border gap-4 px-4 py-1 rounded-full">
              <i
                onClick={() =>
                  start > 1 && router.push(`/admin/users?page=${pageCount - 1}`)
                }
                className={`bx bx-chevron-left p-1 text-orange-600 text-xs border-r pr-4 ${
                  start === 1
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>

              <i
                onClick={() => {
                  if (end < total) {
                    router.push(`/admin/users?page=${pageCount + 1}`);
                  }
                }}
                className={`bx bx-chevron-right p-1 text-orange-600 text-xs  pl-4 ${
                  end >= total
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90vw] md:w-[60vw] rounded-xl p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg">Add new user</h4>
              <i
                className="bx bx-x cursor-pointer text-gray-400 text-sm"
                onClick={() => setShowForm(false)}
              ></i>
            </div>
            <form onSubmit={submitForm} className="w-full mt-5 flex flex-col gap-4">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={modalData.fullName}
                    onChange={(e) => setModalData({ ...modalData, fullName: e.target.value })}
                    className="w-full border-gray-200 rounded-md px-2 py-1.5"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="userName">Username</label>
                  <input
                    type="text"
                    name="userName"
                    value={modalData.userName}
                    onChange={(e) => setModalData({ ...modalData, userName: e.target.value })}
                    className="w-full border-gray-200 rounded-md px-2 py-1.5"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={modalData.password}
                  onChange={(e) => setModalData({ ...modalData, password: e.target.value })}
                  className="w-full border-gray-200 rounded-md px-2 py-1.5"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={modalData.email}
                  onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                  className="w-full border-gray-200 rounded-md px-2 py-1.5"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="phone">Phone No.</label>
                <input
                  type="tel"
                  name="phone"
                  value={modalData.phone}
                  onChange={(e) => setModalData({ ...modalData, phone: e.target.value })}
                  className="w-full border-gray-200 rounded-md px-2 py-1.5"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="isAdmin">Role</label>
                <input
                  name="isAdmin"
                  type="text"
                  value={modalData.isAdmin}
                  onChange={(e) => setModalData({ ...modalData, isAdmin: e.target.value })}
                  className="w-full border-gray-200 rounded-md px-2 py-1.5"
                  required
                >
                </input>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* model    -------------------------------------- */}
      <div
        style={{
          visibility: showModal ? "visible" : "hidden",
          opacity: showModal ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-[100] top-0 left-0 w-full h-screen border-red-600 backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <div
          className={`${
            showModal ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } bg-transparent duration-500 mx-auto my-8 relative p-4 max-w-xl lg:max-w-2xl rounded-lg lg:px-0 px-4`}
        >
          <span onClick={() => setShowModal(false)} className="cursor-pointer">
            <i className="bx bx-x text-2xl bxShadow absolute top-10 right-2 h-8 w-8 flex items-center justify-center text-slate-400 hover:text-gray-500 z-20 cursor-pointer"></i>
          </span>
          <div className="mt-3 grid grid-cols-2 items-center justify-center gap-2 rounded-lg bg-white backdrop-blur-sm">
            <div className="w-full h-[420px]">
              <img
                alt="photo alt"
                src={modalData.photo || "https://github.com/scriptwithahmad/u-shop-2.0/blob/main/public/user.jpeg?raw=true"}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="p-2 bg-transparent rounded-r-lg">
              <h1 className="text-[#1553A1] font-bold mb-4 text-3xl">
                {modalData.fullName}
              </h1>
              <div className="mt-2 text-left">
                <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    User Name
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modalData.userName}
                  </span>
                </div>

                <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Email
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modalData.email}
                  </span>
                </div>

                <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    phone
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modalData.phone}
                  </span>
                </div>

                <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    User Role
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modalData.isAdmin ? "Admin":"User"}
                  </span>
                </div>

                {/* <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Address
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modalData.address}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Index;
