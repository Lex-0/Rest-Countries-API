import React from "react";
import { BsMoon, BsFillMoonFill } from "react-icons/bs";
//import { ThemeContext } from "./context/ThemeContext";

export default function NavTheme({theme, handleTheme}) {
 // const { theme, handleTheme } = useContext(ThemeContext);
  const labelText = theme === "dark" ?  "Dark Mode" : "Light Mode";
  const icon = theme === "dark" ?  <BsFillMoonFill/> : <BsMoon/> ;
  
  return (
    <div className={`nav ${theme === "dark" ? "dark" : ""}`}>
      <div className="contentNav">
        <label>Where in the world?</label>
        <div>
          <button
            className={`btn ${theme === "dark" ? "dark" : ""}`}
            id="handle"
            onClick={handleTheme}
          >
            {icon}
          </button>
          <label htmlFor="handle">{labelText}</label>
        </div>
      </div>
    </div>
  );
}
