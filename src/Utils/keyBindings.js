import { KeyBindingUtil, getDefaultKeyBinding, RichUtils } from "draft-js";

import {
  letterE,
  letterJ,
  letterL,
  letterR,
  number7,
  number8,
  bulletedListCommand,
  numberedListCommand,
  alignLeftCommand,
  alignCenterCommand,
  alignRightCommand,
  alignJustifyCommand
} from "../Constants/shortcuts";

const { hasCommandModifier } = KeyBindingUtil;

const commandModifier = e => hasCommandModifier(e);

const numberedListShortcut = e => e.shiftKey && e.keyCode === number7;
const bulletedListShortcut = e => e.shiftKey && e.keyCode === number8;

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
