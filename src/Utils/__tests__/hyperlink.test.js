import Raw from "draft-js-raw-content-state";
import { insertLink } from "../hyperlink";

const linkValue = "https://google.com";
const linkTitle = "Google";

describe("Hyperlink - insertLink", () => {
  describe("Non-collapsed section", () => {
    const editorState = new Raw()
      .addBlock("")
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
  });

  describe("Collapsed Section", () => {
    const editorState = new Raw()
      .addBlock("block 1")
      .collapse(3)
      .toEditorState();

    const newEditorState = insertLink({ editorState, linkValue, linkTitle });

    it("should add a hyperlink and title", () => {
      const contentState = newEditorState.getCurrentContent();
      const { link, title } = contentState.getEntity("1").getData();
      expect(link).toBe(linkValue);
      expect(title).toBe(linkTitle);
    });
  });
});
