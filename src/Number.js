import React, { useState } from "react";
import Dabber from "./assets/Dabber.png";

const Number = ({ number }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div
      className="item"
      onClick={() => setSelected(!selected)}
    >
      {number}
      {selected && <img src={Dabber} className="selected-img" alt="Dabber" />}
    </div>
  );
};

export default Number;
