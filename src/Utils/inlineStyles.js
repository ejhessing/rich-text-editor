import { EditorState, Modifier, RichUtils } from "draft-js";

import { forceSelection } from "./selected";
import styles from "../Constants/styles";

export const addInlineStyle = ({ editorState, value, type }) => {
  const nextEditorState = removeInlineStyle({ editorState, type });

  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    const newStyles = nextEditorState.getCurrentInlineStyle();

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

  const currentStyle = editorState.getCurrentInlineStyle();

  nextEditorState = EditorState.forceSelection(nextEditorState, selection);

  if (selection.isCollapsed()) {
    const newStyles = currentStyle.filter(x => !styles[type][x]);

    return EditorState.setInlineStyleOverride(nextEditorState, newStyles);
  }
  return nextEditorState;
};

export const toggleInlineStyle = ({ editorState, type }) => {
  const selection = editorState.getSelection();

  const currentStyle = editorState.getCurrentInlineStyle();

  const newEditorState = forceSelection({ editorState });

  if (selection.isCollapsed()) {
    const hasStyle = currentStyle.has(type);
    if (hasStyle) {
      const newStyles = currentStyle.filter(x => type !== x);
      return EditorState.setInlineStyleOverride(newEditorState, newStyles);
    } else {
      return EditorState.setInlineStyleOverride(
        newEditorState,
        currentStyle.add(type)
      );
    }
  }

  return RichUtils.toggleInlineStyle(newEditorState, type);
};
