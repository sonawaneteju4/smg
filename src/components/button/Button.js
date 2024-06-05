import React from "react";

const Button = ({
  type,
  name = "Submit Button",
  className = "bg-white px-4 py-1 shadow-xl rounded-lg border-orange-300 border hover:bg-slate-200",
  onClick,
  icon,
}) => {
  return (
    <button type={type} className={`${className} flex items-center gap-2`}>
      <div>{icon}</div>
      <div>{name}</div>
    </button>
  );
};

export default Button;
