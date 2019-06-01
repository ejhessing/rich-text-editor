import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import ButtonWrapper from "./ButtonWrapper";

const ToolbarIcon = ({ type, onClick, hint, icon, isActive }) => {
  const color = !isActive ? "inherit" : "primary";

  return (
    <ButtonWrapper key={type} onClickFn={onClick} type={type} hint={hint}>
      <IconButton>
        <Icon name={type} color={color}>
          {icon}
        </Icon>
      </IconButton>
    </ButtonWrapper>
  );
};

export default ToolbarIcon;
