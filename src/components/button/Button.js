import React from "react";

const Button = ({
  type,
  name = "Submit Button",
  className = "bg-white px-4 py-1 shadow-xl rounded-xl border-orange-500 border hover:bg-slate-100",
  onClick,
}) => {
  return (
    <button type={type} className={`${className} `}>
      {name}
    </button>
  );
};

export default Button;
