import Raw from "draft-js-raw-content-state";
import { toggleBlockStyle, getBlockType } from "../blockType";

describe("BlockType - toggleBlockStyle", () => {
  describe("Non-collapsed section", () => {
    const editorState = new Raw()
      .addBlock("block 1")
      .anchorKey(0)
      .focusKey(5)
      .toEditorState();

    const newEditorState = toggleBlockStyle({
      editorState,
      type: "ordered-list-item"
    });

    it("should add a custom block type", () => {
      const blockType = getBlockType({ editorState: newEditorState });
      expect(blockType).toEqual("ordered-list-item");
    });

    it("should change the custom block type, if a new block type is chosen", () => {
      const newEditorState2 = toggleBlockStyle({
        editorState: newEditorState,
        type: "unordered-list-item"
      });
      const blockType = getBlockType({ editorState: newEditorState2 });
      expect(blockType).toEqual("unordered-list-item");
    });

    it("should remove the custom block type, if the same block type is chosen", () => {
      const newEditorState2 = toggleBlockStyle({
        editorState: newEditorState,
        type: "ordered-list-item"
      });
      const blockType = getBlockType({ editorState: newEditorState2 });
      expect(blockType).toEqual("unstyled");
    });
  });

  describe("Collapsed Section", () => {
    const editorState = new Raw()
      .addBlock("block 1")
      .collapse(3)
      .toEditorState();

    const newEditorState = toggleBlockStyle({
      editorState,
      type: "ordered-list-item"
    });

    it("should add a custom block type", () => {
      const blockType = getBlockType({ editorState: newEditorState });
      expect(blockType).toEqual("ordered-list-item");
    });

    it("should change the custom block type, if a new block type is chosen", () => {
      const newEditorState2 = toggleBlockStyle({
        editorState: newEditorState,
        type: "unordered-list-item"
      });
      const blockType = getBlockType({ editorState: newEditorState2 });
      expect(blockType).toEqual("unordered-list-item");
    });

    it("should remove the custom block type, if the same block type is chosen", () => {
      const newEditorState2 = toggleBlockStyle({
        editorState: newEditorState,
        type: "ordered-list-item"
      });
      const blockType = getBlockType({ editorState: newEditorState2 });
      expect(blockType).toEqual("unstyled");
    });
  });
});
