import React from "react";

const Input = ({ value, setValue, type, placeholder, ...props }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className='outline-none border border-gray-200 rounded-md py-2 px-3 focus:border-blue-300 transition-all duration-300 font-medium'
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
