import React from "react";
import { RichUtils } from "draft-js";

import ToolbarIcon from "../../Components/ToolbarIcon";
import { textAlignment } from "../../Constants/Toolbar";
import { getBlockType } from "../../Utils/blockType";
import { forceSelection } from "../../Utils/selected.js";

import "./style.css";

const TextAlignment = ({ editorState, onChange }) => {
  const onUserInput = type => {
    const newEditorState = forceSelection({ editorState });
    onChange(RichUtils.toggleBlockType(newEditorState, type));
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
