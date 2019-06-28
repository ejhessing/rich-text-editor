import React from "react";

import { fontStyles } from "../../Constants/Toolbar";
import ToolbarIcon from "../../Components/ToolbarIcon";
import { toggleInlineStyle } from "../../Utils/inlineStyles";

const FontStyles = ({ editorState, onChange }) => {
  const onUserInput = type => {
    onChange(toggleInlineStyle({ editorState, type }));
  };

  const currentStyles = editorState.getCurrentInlineStyle();

  const fontIcons = fontStyles.map(({ type, icon, hint }) => {
    const isActive = currentStyles.has(type);

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

  return <React.Fragment>{fontIcons}</React.Fragment>;
};

export default FontStyles;
