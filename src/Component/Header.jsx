// Header.js
import React from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice/index";


function Header() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <header className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Task Manager</h1>
        <div>
          {!isDarkMode ? (
            <DarkModeOutlinedIcon onClick={handleToggle} />
          ) : (
            <DarkModeIcon onClick={handleToggle} />
          )}
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
