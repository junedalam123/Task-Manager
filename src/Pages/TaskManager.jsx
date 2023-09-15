import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import {
  addTask,
  selectFilteredTasks,
  setActiveTab,
  updateTask,
} from "../Redux/TaskbarSlice";
import Card from "../Component/Card";
import Tabs from "../Component/Tabs";

const TaskManager = () => {
  const [hanldeEdit, setHanldeEdit] = useState(false);
  const [editingId, setEditingId] = useState("");
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const { tasks, activeTab } = useSelector((state) => state.AllTask);
  const filteredTasks = useSelector(selectFilteredTasks);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleAddTask = () => {
    if (taskData?.title?.trim() !== "") {
      dispatch(
        addTask({
          id: Date.now(),
          title: taskData?.title,
          description: taskData?.description,
          status: false,
        })
      );
      setTaskData({ title: "", description: "" });
    }
  };

  const editItemPrefilled = (selectedItem) => {
    setEditingId(selectedItem);
    const abledToEdit = tasks?.filter((item) => item?.id === selectedItem);
    setTaskData({
      title: abledToEdit?.[0].title,
      description: abledToEdit?.[0].description,
      status: abledToEdit?.[0].status,
    });
  };

  const hanldeEditDetail = (e) => {
    if (taskData.title.trim() !== "" && editingId !== null) {
      dispatch(
        updateTask({
          id: editingId,
          title: taskData?.title,
          description: taskData?.description,
        })
      );
      setTaskData({ title: "", description: "" });
      setEditingId(null);
      setHanldeEdit(false);
    }
  };

  const handleClose = () => {
    setState({
      open: false,
      vertical: "top",
      horizontal: "center",
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-4">
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-8 shadow-lg rounded-lg w-full md:w-2/2 lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">
              {hanldeEdit ? "Edit" : "Add"} Task
            </h2>

            <form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={taskData?.title}
                  onChange={handleInputChange}
                  className={`mt-1 p-2 w-full border border-gray-300 rounded-md ${
                    isDarkMode ? "text-red-500" : ""
                  }`}
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={taskData?.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={`mt-1 p-2 w-full border border-gray-300 rounded-md ${
                    isDarkMode ? "text-red-500" : ""
                  }`}
                  placeholder="Enter your message"
                />
              </div>

              <div className="mt-6">
                {hanldeEdit ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={hanldeEditDetail}
                  >
                    Edit Task
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      handleAddTask();
                      setState({
                        open: true,
                        vertical: "top",
                        horizontal: "center",
                      });
                    }}
                  >
                    Add Task
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 p-4">
        <div className="mt-32">
          <Tabs {...{ activeTab }} />
        </div>

        <div className="mt-[60px]">
          {filteredTasks?.length > 0 ? (
            filteredTasks?.map(({ id, title, description, status }) => (
              <Card
                key={id}
                {...{
                  id,
                  title,
                  description,
                  status,
                  editItemPrefilled,
                  setHanldeEdit,
                }}
              />
            ))
          ) : (
            <div className="text-center">No Data Found</div>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message="Taskbar Added"
        key={vertical + horizontal}
      />
    </div>
  );
};

export default TaskManager;
