import React, { useEffect } from "react";
import Headers from "../Component/Header";
import { useSelector } from "react-redux";
import TaskManager from "../Pages/TaskManager";

const Layout = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      <Headers />
      <TaskManager />
    </>
  );
};

export default React.memo(Layout);
