import { EditorState, Modifier, RichUtils } from "draft-js";

import styles from "../Constants/styles";

export const addInlineStyle = ({ editorState, value, type }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styles[type]).reduce(
    (contentState, style) =>
      Modifier.removeInlineStyle(contentState, selection, style),
    currentContent
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    "change-inline-style"
  );

  const currentStyle = editorState.getCurrentInlineStyle();

  nextEditorState = EditorState.forceSelection(nextEditorState, selection);

  if (selection.isCollapsed()) {
    const newStyles = currentStyle.filter(style => !styles[type][style]);

    return EditorState.setInlineStyleOverride(
      nextEditorState,
      newStyles.add(value)
    );
  }

  return RichUtils.toggleInlineStyle(nextEditorState, value);
};

export const removeInlineStyle = ({ editorState, type }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styles[type]).reduce(
    (contentState, style) =>
      Modifier.removeInlineStyle(contentState, selection, style),
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
