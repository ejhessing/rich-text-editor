import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { getSelectedText, getSelected } from "../selected";

describe("Selected ", () => {
  const contentBlocks = convertFromHTML("<div>test</div>");
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  describe("getSelectedText", () => {
    it("should get the correct selected text", () => {
      const addSelection = editorState.getSelection().merge({
        anchorOffset: 0,
        focusOffset: 4
      });

      const esWithNewSelection = EditorState.acceptSelection(
        editorState,
        addSelection
      );

      const selectedText = getSelectedText({ editorState: esWithNewSelection });

      expect(selectedText).toBe("test");
    });

    it("should not get anything if there is no text on the selection", () => {
      const addSelection = editorState.getSelection().merge({
        anchorOffset: 5,
        focusOffset: 6
      });

      const esWithNewSelection = EditorState.acceptSelection(
        editorState,
        addSelection
      );

      const selectedText = getSelectedText({ editorState: esWithNewSelection });

      expect(selectedText).toBe("");
    });
  });
});
