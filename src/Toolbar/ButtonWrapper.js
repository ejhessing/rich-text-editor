import React from "react";
import { Tooltip } from "antd";

const ButtonWrapper = ({ children, onClickFn, hint }) => {
  return (
    <Tooltip title={hint}>
      <span
        onMouseDown={e => {
          e.preventDefault();
          onClickFn(e);
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default ButtonWrapper;
