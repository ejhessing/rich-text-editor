import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const ButtonWrapper = ({ children, onClickFn, hint, type }) => {
  return (
    <Tooltip title={hint} placement="top">
      <span
        onMouseDown={e => {
          e.preventDefault();
          onClickFn(type);
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default ButtonWrapper;
