import { KeyBindingUtil, getDefaultKeyBinding, RichUtils } from "draft-js";

export const letterE = 69;
export const letterJ = 74;
export const letterL = 76;
export const letterR = 82;

export const number7 = 55;
export const number8 = 56;

export const bulletedListCommand = "unordered-list-item";
export const numberedListCommand = "ordered-list-item";

export const alignLeftCommand = "LEFT-ALIGN";
export const alignCenterCommand = "CENTER-ALIGN";
export const alignRightCommand = "RIGHT-ALIGN";
export const alignJustifyCommand = "JUSTIFY-ALIGN";

const { hasCommandModifier } = KeyBindingUtil;

const commandModifier = e => hasCommandModifier(e);

const numberedListShortcut = e => e.keyCode === number7;
const bulletedListShortcut = e => e.keyCode === number8;

const alignLeft = e => e.keyCode === letterL;
const alignCenter = e => e.keyCode === letterE;
const alignRight = e => e.keyCode === letterR;
const alignJustify = e => e.keyCode === letterJ;

export const keyBindingFn = e => {
  if (commandModifier(e)) {
    if (bulletedListShortcut(e)) return bulletedListCommand;
    if (numberedListShortcut(e)) return numberedListCommand;
    if (alignLeft(e)) return alignLeftCommand;
    if (alignCenter(e)) return alignCenterCommand;
    if (alignRight(e)) return alignRightCommand;
    if (alignJustify(e)) return alignJustifyCommand;
  }

  return getDefaultKeyBinding(e);
};

export const handleKeyShortcuts = ({ command, editorState }) => {
  const updateBlockType = type => RichUtils.toggleBlockType(editorState, type);

  switch (command) {
    case bulletedListCommand:
      return updateBlockType(command);

    case numberedListCommand:
      return updateBlockType(command);

    case alignLeftCommand:
      return updateBlockType(command);

    case alignCenterCommand:
      return updateBlockType(command);

    case alignRightCommand:
      return updateBlockType(command);

    case alignJustifyCommand:
      return updateBlockType(command);

    default:
      return RichUtils.handleKeyCommand(editorState, command);
  }
};
