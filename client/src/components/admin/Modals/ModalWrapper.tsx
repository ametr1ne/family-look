import React from "react";

const ModalWrapper = ({ opened, setOpened, children }) => {
  return (
    <div
      onClick={() => setOpened(false)}
      className={`fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center transition-all duration-500 ${
        opened ? "visible opacity-100" : "opacity-0 invisible"
      }`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`content bg-white p-16 rounded-lg transition-all duration-500 ${
          opened ? "scale-100" : "scale-75"
        }`}>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
