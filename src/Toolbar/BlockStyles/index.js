import React from "react";
import { RichUtils } from "draft-js";
import ToolbarIcon from "../ToolbarIcon";
import { blockStyles } from "../../Constants/Toolbar";

const BlockStyles = ({ editorState, onChange }) => {
  const onClick = type => {
    onChange(RichUtils.toggleBlockType(editorState, type));
  };

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const blockIcons = blockStyles.map(({ type, icon, hint }) => {
    const isActive = type === blockType;

    return (
      <ToolbarIcon
        key={type}
        type={type}
        onClick={onClick}
        hint={hint}
        icon={icon}
        isActive={isActive}
      />
    );
  });

  return <React.Fragment>{blockIcons}</React.Fragment>;
};

export default BlockStyles;
