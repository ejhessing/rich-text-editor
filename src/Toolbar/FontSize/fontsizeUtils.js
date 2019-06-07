import { EditorState, Modifier, RichUtils } from "draft-js";

import { styleMap } from "../../Constants/Toolbar";

export const addFont = ({ editorState, value }) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  const nextContentState = Object.keys(styleMap).reduce(
    (contentState, font) =>
      Modifier.removeInlineStyle(contentState, selection, font),
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
