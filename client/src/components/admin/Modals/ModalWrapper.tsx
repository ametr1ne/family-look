"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  opened: boolean;
  close: () => void;
  children: ReactNode;
};

const ModalWrapper = ({ opened, close, children }: Props) => {
  return (
    <div
      onClick={() => close()}
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
