import Sidebar from "components/Shared/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";

function Practice() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div>
      <h1>hii i am practice</h1>
      <button
        onClick={() => {
          setOpenMenu((prev) => !prev);
        }}
      >
        toggle
      </button>
      <div></div>
    </div>
  );
}

export default Practice;
