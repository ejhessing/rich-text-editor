import React from "react";

import ToolbarIcon from "../../Components/ToolbarIcon";
import { listStyles } from "../../Constants/Toolbar";
import { getBlockType } from "../../Utils/blockType";
import { toggleBlockStyle } from "../../Utils/blockType";

const ListStyles = ({ editorState, onChange }) => {
  const onUserInput = type => {
    onChange(toggleBlockStyle({ type, editorState }));
  };

  const listType = getBlockType({ editorState });

  const listIcons = listStyles.map(({ type, icon, hint }) => {
    const isActive = type === listType;

    return (
      <ToolbarIcon
        key={type}
        type={type}
        onUserInput={onUserInput}
        hint={hint}
        icon={icon}
        isActive={isActive}
      />
    );
  });

  return <React.Fragment>{listIcons}</React.Fragment>;
};

export default ListStyles;
