import React from "react";
import { Button, Icon } from "antd";
import { RichUtils } from "draft-js";

import ButtonWrapper from "../ButtonWrapper";
import { blockStyles } from "../../Constants/Toolbar";

const BlockStyles = ({ editorState, onChange }) => {
  const onClick = e => {
    onChange(RichUtils.toggleBlockType(editorState, e.target.name));
  };

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const blockIcons = blockStyles.map(({ type, icon, hint }) => {
    const isActive = type === blockType;

    const style = isActive ? "blue" : "black";

    return (
      <ButtonWrapper key={type} onClickFn={onClick} hint={hint}>
        <Button name={type}>
          <Icon type={icon} style={{ color: style }} theme="outlined" />
        </Button>
      </ButtonWrapper>
    );
  });

  return <span>{blockIcons}</span>;
};

export default BlockStyles;
