import { EditorState, Modifier, RichUtils } from "draft-js";

import { styleTextColor, styleHighlightColor } from "../Constants/Toolbar";

export const addColor = ({ editorState, value }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styleTextColor).reduce(
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
    nextEditorState = currentStyle.reduce((state, color) => {
      if (styleTextColor[color]) {
        return RichUtils.toggleInlineStyle(state, color);
      }
      return state;
    }, nextEditorState);
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

  const nextContentState = Object.keys(styleTextColor).reduce(
    (contentState, color) =>
      Modifier.removeInlineStyle(contentState, selection, color),
    currentContent
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    "change-inline-style"
  );

  nextEditorState = EditorState.forceSelection(
    nextEditorState,
    nextEditorState.getSelection()
  );

  return nextEditorState;
};

export const addHighlightColor = ({ editorState, value }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styleHighlightColor).reduce(
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
    nextEditorState = currentStyle.reduce((state, color) => {
      if (styleHighlightColor[color]) {
        return RichUtils.toggleInlineStyle(state, color);
      }
      return state;
    }, nextEditorState);
  }

  nextEditorState = EditorState.forceSelection(
    nextEditorState,
    nextEditorState.getSelection()
  );

  return RichUtils.toggleInlineStyle(nextEditorState, value);
};

export const removeHighlight = ({ editorState }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styleHighlightColor).reduce(
    (contentState, color) =>
      Modifier.removeInlineStyle(contentState, selection, color),
    currentContent
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    "change-inline-style"
  );

  nextEditorState = EditorState.forceSelection(
    nextEditorState,
    nextEditorState.getSelection()
  );

  return nextEditorState;
};
