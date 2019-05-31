import React from "react";

const ButtonWrapper = ({ children, onClickFn, hint }) => {
  return (
    <span
      onMouseDown={e => {
        e.preventDefault();
        onClickFn(e);
      }}
    >
      {children}
    </span>
  );
};

export default ButtonWrapper;
