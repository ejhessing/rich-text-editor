import React from "react";
import { RichUtils } from "draft-js";
import ToolbarIcon from "../ToolbarIcon";
import { listStyles } from "../../Constants/Toolbar";
import { getBlockType } from "../../Utils/blockType";

const ListStyles = ({ editorState, onChange }) => {
  const onClick = type => {
    onChange(RichUtils.toggleBlockType(editorState, type));
  };

  const listType = getBlockType({ editorState });

  const listIcons = listStyles.map(({ type, icon, hint }) => {
    const isActive = type === listType;

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

  return <React.Fragment>{listIcons}</React.Fragment>;
};

export default ListStyles;
