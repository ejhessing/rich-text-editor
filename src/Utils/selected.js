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

// Does not handle selectedText from multiple lines
export const getSelectedText = ({ editorState }) => {
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);

  const start = selection.getStartOffset();
  const end = selection.getEndOffset();
  return currentBlock.getText().slice(start, end);
};
