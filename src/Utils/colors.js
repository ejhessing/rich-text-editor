import { EditorState, Modifier, RichUtils } from "draft-js";

import { styleMap } from "../Constants/Toolbar";

export const addColor = ({ editorState, value }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styleMap).reduce(
    (contentState, color) =>
      Modifier.removeInlineStyle(contentState, selection, color),
    currentContent
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    "change-inline-style"
  );

  const currentStyle = editorState.getCurrentInlineStyle();

  if (selection.isCollapsed()) {
    nextEditorState = currentStyle.reduce(
      (state, color) => RichUtils.toggleInlineStyle(state, color),
      nextEditorState
    );
  }

  nextEditorState = EditorState.forceSelection(
    nextEditorState,
    nextEditorState.getSelection()
  );

  return RichUtils.toggleInlineStyle(nextEditorState, value);
};

export const removeColor = ({ editorState }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styleMap).reduce(
    (contentState, color) =>
      Modifier.removeInlineStyle(contentState, selection, color),
    currentContent
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    "change-inline-style"
  );

  // const currentStyle = editorState.getCurrentInlineStyle();

  // if (selection.isCollapsed()) {
  //   nextEditorState = currentStyle.reduce(
  //     (state, color) => RichUtils.toggleInlineStyle(state, color),
  //     nextEditorState
  //   );
  // }

  nextEditorState = EditorState.forceSelection(
    nextEditorState,
    nextEditorState.getSelection()
  );

  return nextEditorState;
};
