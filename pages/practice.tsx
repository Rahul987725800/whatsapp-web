import Menu from "components/Shared/Menu/Menu";
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
      <div>
        <Menu open={openMenu} />
      </div>
    </div>
  );
}

export default Practice;
