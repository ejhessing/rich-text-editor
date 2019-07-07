import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { toggleBlockStyle, getBlockType } from "../blockType";

const contentBlocks = convertFromHTML("<div>test</div>");
const contentState = ContentState.createFromBlockArray(contentBlocks);
const emptyEditorState = EditorState.createWithContent(contentState);

describe("BlockType - toggleBlockStyle", () => {
  describe("Non-collapsed section", () => {
    const addSelection = emptyEditorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 5
    });

    const editorState = EditorState.acceptSelection(
      emptyEditorState,
      addSelection
    );

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
    const addSelection = emptyEditorState.getSelection().merge({
      anchorOffset: 7,
      focusOffset: 7
    });

    const editorState = EditorState.acceptSelection(
      emptyEditorState,
      addSelection
    );

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
