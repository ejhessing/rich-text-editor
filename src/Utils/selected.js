import { EditorState } from "draft-js";

export const getSelected = () => {
  if (window.getSelection) {
    return window.getSelection();
  } else if (document.getSelection) {
    return document.getSelection();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
};

export const forceSelection = ({ editorState }) =>
  EditorState.forceSelection(editorState, editorState.getSelection());
