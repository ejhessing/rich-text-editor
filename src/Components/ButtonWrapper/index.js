import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const ButtonWrapper = ({ children, onUserInputFn, hint, type }) => {
  return (
    <Tooltip title={hint} placement="top">
      <span
        onMouseDown={e => {
          e.preventDefault();
          onUserInputFn(type);
        }}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            e.preventDefault();
            onUserInputFn(type);
          }
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default ButtonWrapper;
