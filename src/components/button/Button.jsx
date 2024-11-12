import React from "react";

const Button = ({ onClick, filterVisible }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white relative px-8 py-2 rounded-md isolation-auto z-10 border-2  ${
        filterVisible ? "bg-orange-600" : "bg-orange-400"
      } before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-orange-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700`}
    >
      Filter
    </button>
  );
};

export default Button;
