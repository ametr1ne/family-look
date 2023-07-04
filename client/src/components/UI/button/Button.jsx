import React from "react";

const Button = ({ onClick, customStyle, children }) => {
  return (
    <button
      onClick={onClick}
      className={
        "bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white uppercase text-sm font-semibold gap-2 flex items-center justify-center rounded-md py-2 px-3 " +
        customStyle
      }>
      {children}
    </button>
  );
};

export default Button;
