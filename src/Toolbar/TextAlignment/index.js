import React from "react";
import { RichUtils } from "draft-js";

import ToolbarIcon from "../../Components/ToolbarIcon";
import { textAlignment } from "../../Constants/Toolbar";
import { getBlockType } from "../../Utils/blockType";
import "./style.css";

const TextAlignment = ({ editorState, onChange }) => {
  const onClick = type => {
    onChange(RichUtils.toggleBlockType(editorState, type));
  };

  const blockType = getBlockType({ editorState });

  const textAlignments = textAlignment.map(({ type, icon, hint }) => {
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

  return <React.Fragment>{textAlignments}</React.Fragment>;
};

export default TextAlignment;
