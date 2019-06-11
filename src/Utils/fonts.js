import { EditorState, Modifier, RichUtils } from "draft-js";

import { styleFontSizes, styleFontTypes } from "../Constants/Toolbar";

export const addFontSizes = ({ editorState, value }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styleFontSizes).reduce(
    (contentState, font) => {
      return Modifier.removeInlineStyle(contentState, selection, font);
    },
    currentContent
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    "change-inline-style"
  );

  const currentStyle = editorState.getCurrentInlineStyle();

  if (selection.isCollapsed()) {
    nextEditorState = currentStyle.reduce((state, font) => {
      return RichUtils.toggleInlineStyle(state, font);
    }, nextEditorState);
  }

  nextEditorState = EditorState.forceSelection(
    nextEditorState,
    nextEditorState.getSelection()
  );

  return RichUtils.toggleInlineStyle(nextEditorState, value);
};

export const addFontTypes = ({ editorState, value }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styleFontTypes).reduce(
    (contentState, font) => {
      return Modifier.removeInlineStyle(contentState, selection, font);
    },
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
      (state, font) => RichUtils.toggleInlineStyle(state, font),
      nextEditorState
    );
  }

  nextEditorState = EditorState.forceSelection(
    nextEditorState,
    nextEditorState.getSelection()
  );

  return RichUtils.toggleInlineStyle(nextEditorState, value);
};
