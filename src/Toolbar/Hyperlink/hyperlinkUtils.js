import { EditorState, Modifier, RichUtils } from "draft-js";
import {
  getEntityRange,
  getSelectionEntity,
  getSelectionText
} from "draftjs-utils";

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

export const insertLink = ({ editorState, linkValue, linkTitle }) => {
  const contentState = editorState.getCurrentContent();
  const currentEntity = getSelectionEntity(editorState);
  const currentSelection = editorState.getSelection();

  const selection = currentEntity
    ? getSelection({ editorState, currentEntity, selection: currentSelection })
    : currentSelection;

  const contentStateWithEntity = contentState.createEntity(
    "LINK",
    "MUTABLE", //Immutable?
    { link: linkValue }
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

export const removeLink = ({ editorState }) => {
  const currentEntity = getSelectionEntity(editorState);

  if (currentEntity) {
    const currentSelection = editorState.getSelection();

    const fullSelection = getSelection({
      editorState,
      currentEntity,
      selection: currentSelection
    });

    const esWithoutLink = RichUtils.toggleLink(
      editorState,
      fullSelection,
      null
    );

    // Get link text and add it to selection
    const esWithoutSelection = EditorState.acceptSelection(
      esWithoutLink,
      esWithoutLink.getSelection().merge({
        anchorOffset: currentSelection.get("anchorOffset") + 0,
        focusOffset: currentSelection.get("anchorOffset") + 0
      })
    );

    return esWithoutSelection;
  }
};

export const getLink = ({ editorState }) => {
  const currentEntity = getSelectionEntity(editorState);
  const contentState = editorState.getCurrentContent();
  if (
    currentEntity &&
    contentState.getEntity(currentEntity).get("type") === "LINK"
  ) {
    return contentState.getEntity(currentEntity).get("data").link;
  }
  return null;
};
