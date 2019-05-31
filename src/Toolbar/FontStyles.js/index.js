import React from "react";
import { Button, Icon } from "antd";
import { RichUtils } from "draft-js";

import ButtonWrapper from "../ButtonWrapper";
import { fontStyles } from "../../Constants/Toolbar";

const FontStyles = ({ editorState, onChange }) => {
  const onClick = e => {
    onChange(RichUtils.toggleInlineStyle(editorState, e.target.name));
  };

  const currentStyles = editorState.getCurrentInlineStyle();

  const fontIcons = fontStyles.map(({ type, icon, hint }) => {
    const isActive = currentStyles.has(type);

    const style = isActive ? "blue" : "black";

    return (
      <ButtonWrapper key={type} onClickFn={onClick} hint={hint}>
        <Button name={type}>
          <Icon type={icon} style={{ color: style }} theme="outlined" />
        </Button>
      </ButtonWrapper>
    );
  });

  return <span>{fontIcons}</span>;
};

export default FontStyles;
