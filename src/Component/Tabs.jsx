import React from "react";
import { setActiveTab } from "../Redux/TaskbarSlice";
import { useDispatch } from "react-redux";

const Tabs = ({ activeTab }) => {
  const dispatch = useDispatch();
  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };
  return (
    <div>
      <div className="w-1/2 flex justify-between">
        <button
          className={`${
            activeTab === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          } py-2 px-4 mr-3 rounded`}
          onClick={() => handleTabChange("all")}
        >
          All
        </button>
        <button
          className={`${
            activeTab === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          } py-2 px-4 mr-3 rounded`}
          onClick={() => handleTabChange("pending")}
        >
          Pending
        </button>
        <button
          className={`${
            activeTab === "success"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          } py-2 px-4 rounded`}
          onClick={() => handleTabChange("success")}
        >
          Success
        </button>
      </div>
    </div>
  );
};

export default Tabs;
