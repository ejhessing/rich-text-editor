import React from "react";
import { RichUtils } from "draft-js";

import { fontStyles } from "../../Constants/Toolbar";
import ToolbarIcon from "../ToolbarIcon";

const FontStyles = ({ editorState, onChange }) => {
  const onClick = type => {
    onChange(RichUtils.toggleInlineStyle(editorState, type));
  };

  const currentStyles = editorState.getCurrentInlineStyle();

  const fontIcons = fontStyles.map(({ type, icon, hint }) => {
    const isActive = currentStyles.has(type);

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

  return <React.Fragment>{fontIcons}</React.Fragment>;
};

export default FontStyles;
