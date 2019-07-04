import Raw from "draft-js-raw-content-state";
import { EditorState } from "draft-js";
import { insertLink, removeLink, getLinkDetails } from "../hyperlink";

const linkValue = "https://google.com";
const linkTitle = "Google";

describe("Hyperlink - insertLink", () => {
  describe("Non-collapsed section", () => {
    const editorState = new Raw()
      .addBlock("abc")
      .setKey("edr45")
      .anchorKey(0)
      .focusKey(6)
      .toEditorState();

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
  });

  describe("Collapsed Section", () => {
    const editorState = new Raw()
      .addBlock("")
      .collapse(3)
      .toEditorState();

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
  });
});
