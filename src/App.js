import { useState } from "react";
import EntireData from "./EntireData.jsx";
import Search from "./Search.jsx";
import "./styles.css";

export default function App() {
  const button_val = JSON.parse(localStorage.getItem("button"));
  const [partial, setPartial] = useState(
    button_val === undefined ? false : button_val
  );

  const clicked = (e) => {
    e.preventDefault();
    setPartial(!partial);
    localStorage.setItem("button", JSON.stringify(partial));
  };

  return (
    <div className="App">
      <h1> USA Data </h1>
      <button onClick={clicked}>
        {partial ? "Show All Data" : "Search by State / Year"}
      </button>
      <h2>{partial ? "Search Data" : "All Data"}</h2>
      {partial ? <Search /> : <EntireData />}
    </div>
  );
}
