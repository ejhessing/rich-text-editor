import React from "react";

import ToolbarIcon from "../../Components/ToolbarIcon";
import { textAlignment } from "../../Constants/Toolbar";
import { getBlockType } from "../../Utils/blockType";
import { toggleBlockStyle } from "../../Utils/blockType";

import "./style.css";

const TextAlignment = ({ editorState, onChange }) => {
  const onUserInput = type => {
    onChange(toggleBlockStyle({ type, editorState }));
  };

  const blockType = getBlockType({ editorState });

  const textAlignments = textAlignment.map(({ type, icon, hint }) => {
    const isActive = type === blockType;

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

  return <React.Fragment>{textAlignments}</React.Fragment>;
};

export default TextAlignment;
