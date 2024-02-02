import clsx from "clsx";
import React, { ReactNode } from "react";

const Button = ({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white uppercase text-sm font-semibold gap-2 flex items-center justify-center rounded-md py-2 px-3",
        className
      )}>
      {children}
    </button>
  );
};

export default Button;
