import { EditorState, Modifier } from "draft-js";
import { getEntityRange, getSelectionEntity } from "draftjs-utils";

export const getSelection = ({ editorState, currentEntity, selection }) => {
  const entityRange = getEntityRange(editorState, currentEntity);
  const isBackwards = selection.getIsBackward();

  if (isBackwards) {
    return selection.merge({
      anchorOffset: entityRange.end,
      focusOffset: entityRange.start
    });
  }

  return selection.merge({
    anchorOffset: entityRange.start,
    focusOffset: entityRange.end
  });
};

export const insertLink = ({ editorState, urlValue, linkTitle }) => {
  const contentState = editorState.getCurrentContent();
  const currentEntity = getSelectionEntity(editorState);
  const currentSelection = editorState.getSelection();

  const selection = currentEntity
    ? getSelection({ editorState, currentEntity, selection: currentSelection })
    : currentSelection;

  const contentStateWithEntity = contentState.createEntity(
    "LINK",
    "MUTABLE", //Immutable?
    { url: urlValue }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newContentState = Modifier.replaceText(
    contentState,
    selection,
    linkTitle,
    editorState.getCurrentInlineStyle(),
    entityKey
  );

  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "insert-characters"
  );

  const newSelection = newEditorState.getSelection().merge({
    anchorOffset: selection.get("anchorOffset") + linkTitle.length,
    focusOffset: selection.get("anchorOffset") + linkTitle.length
  });

  const esWithNewSelection = EditorState.acceptSelection(
    newEditorState,
    selection
  );

  const contentStateWithSpace = Modifier.insertText(
    newEditorState.getCurrentContent(),
    newSelection,
    " ",
    editorState.getCurrentInlineStyle()
  );

  return EditorState.push(
    esWithNewSelection,
    contentStateWithSpace,
    "insert-characters"
  );
};
