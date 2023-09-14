import React from "react";
import { removeTask, toggleTaskStatus } from "../Redux/TaskbarSlice";
import { useDispatch } from "react-redux";

const Card = ({
  id,
  title,
  description,
  status,
  editItemPrefilled,
  setHanldeEdit,
}) => {
  const dispatch = useDispatch();
  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const handleCheckboxChange = (id) => {
    dispatch(toggleTaskStatus({ id }));
  };
  return (
    <div className="p-4 shadow-lg rounded-lg mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          className="form-checkbox text-blue-500"
          checked={status}
          onChange={()=>{handleCheckboxChange(id)}}
        />
        <label className="ml-2 text-sm text-gray-700">Complete</label>
      </div>
      <div className="flex">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none mr-2"
          onClick={() => {
            editItemPrefilled(id);
            setHanldeEdit(true);
            window.scrollTo(0,0)
          }}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          onClick={() => {
            handleRemoveTask(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;


