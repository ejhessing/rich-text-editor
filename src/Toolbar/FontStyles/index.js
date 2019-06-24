import React from "react";
import { RichUtils } from "draft-js";

import { fontStyles } from "../../Constants/Toolbar";
import ToolbarIcon from "../../Components/ToolbarIcon";
import { forceSelection } from "../../Utils/selected.js";

const FontStyles = ({ editorState, onChange }) => {
  const onUserInput = type => {
    const newEditorState = forceSelection({ editorState });
    onChange(RichUtils.toggleInlineStyle(newEditorState, type));
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
