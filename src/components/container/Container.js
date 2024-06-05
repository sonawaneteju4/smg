import React from "react";

const Container = ({ children, style, className = "w-screen", id = "" }) => {
  return (
    <div style={style} className={className} id={id}>
      <div className="container max-w-full">{children}</div>
    </div>
  );
};

export default Container;
