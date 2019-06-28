import { forceSelection } from "./selected.js";
import { RichUtils } from "draft-js";

export const getBlockType = ({ editorState }) => {
  const selection = editorState.getSelection();
  return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
};

export const toggleBlockStyle = ({ editorState, type }) => {
  const newEditorState = forceSelection({ editorState });
  return RichUtils.toggleBlockType(newEditorState, type);
};
