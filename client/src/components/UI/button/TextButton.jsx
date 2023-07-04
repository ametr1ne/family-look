import React, { useEffect, useState } from "react";

const TextButton = ({ variant, clickHandler = null, children }) => {
  const [style, setStyle] = useState("");

  useEffect(() => {
    switch (variant) {
      case "red":
        setStyle("text-red-400 hover:text-red-500");
        break;
      case "black":
        setStyle("text-zinc-500 hover:text-zinc-900");
        break;
    }
  }, [variant]);

  return (
    <button
      onClick={clickHandler}
      className={`flex items-center gap-1 uppercase place-self-end font-semibold ${style}`}>
      {children}
    </button>
  );
};

export default TextButton;
