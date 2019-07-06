import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { insertLink, removeLink, getLinkDetails } from "../hyperlink";

const linkValue = "https://google.com";
const linkTitle = "Google";

describe("Hyperlink - insertLink", () => {
  const contentBlocks = convertFromHTML("<div>test</div>");
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  const newEditorState = insertLink({ editorState, linkValue, linkTitle });

  it("should add a hyperlink and title", () => {
    const contentState = newEditorState.getCurrentContent();
    const { link, title } = contentState.getEntity("1").getData();
    expect(link).toBe(linkValue);
    expect(title).toBe(linkTitle);
  });

  it("should remove the hyperlink", () => {
    const addSelection = newEditorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 6
    });

    const esWithNewSelection = EditorState.acceptSelection(
      newEditorState,
      addSelection
    );

    const editorStateWithoutLink = removeLink({
      editorState: esWithNewSelection
    });

    const { link, title } = getLinkDetails({
      editorState: editorStateWithoutLink
    });

    expect(link).toBeUndefined();
    expect(title).toBeUndefined();
  });

  it("should get the correct details if there is a link", () => {
    const addSelection = newEditorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 6
    });

    const esWithNewSelection = EditorState.acceptSelection(
      newEditorState,
      addSelection
    );

    const { link, title } = getLinkDetails({
      editorState: esWithNewSelection
    });

    expect(link).toBe(linkValue);
    expect(title).toBe(linkTitle);
  });

  it("should not return anything if there is no link present", () => {
    const addSelection = newEditorState.getSelection().merge({
      anchorOffset: 7,
      focusOffset: 9
    });

    const esWithNewSelection = EditorState.acceptSelection(
      newEditorState,
      addSelection
    );

    const { link, title } = getLinkDetails({
      editorState: esWithNewSelection
    });

    expect(link).toBeUndefined();
    expect(title).toBeUndefined();
  });
});
