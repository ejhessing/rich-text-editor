import Raw from "draft-js-raw-content-state";
import { convertToRaw, convertFromRaw, RichUtils } from "draft-js";
import { OrderedSet } from "immutable";
import { addInlineStyle, removeInlineStyle } from "../inlineStyles";

const blockInlineStyleRanges = (editorState, i = 0) => {
  return convertToRaw(editorState.getCurrentContent()).blocks[i]
    .inlineStyleRanges;
};

describe("inlineStyles - addInlineStyle", () => {
  describe("Non-collapsed section", () => {
    const editorState = new Raw()
      .addBlock("block 1")
      .anchorKey(0)
      .focusKey(5)
      .toEditorState();

    const newEditorState = addInlineStyle({
      editorState,
      value: "COLOR-RED",
      type: "textColor"
    });

    it("should add a custom inline style", () => {
      const inlineStyleRanges = blockInlineStyleRanges(newEditorState, 0);
      expect(inlineStyleRanges).toEqual([
        {
          style: "COLOR-RED",
          length: 5,
          offset: 0
        }
      ]);
    });

    it("should add two different colors and only the latest should be there", () => {
      const newEditorState2 = addInlineStyle({
        editorState: newEditorState,
        value: "COLOR-GREEN",
        type: "textColor"
      });
      const inlineStyleRanges = blockInlineStyleRanges(newEditorState2, 0);
      expect(inlineStyleRanges).toEqual([
        {
          style: "COLOR-GREEN",
          length: 5,
          offset: 0
        }
      ]);
    });
  });

  describe("Collapsed Section", () => {
    const editorState = new Raw()
      .addBlock("block 1")
      .collapse(3)
      .toEditorState();

    const newEditorState = addInlineStyle({
      editorState,
      value: "COLOR-RED",
      type: "textColor"
    });

    it("should add a customStyleOverride when adding style", () => {
      const override = newEditorState.getInlineStyleOverride();
      expect(override.toJS()).toEqual(OrderedSet(["COLOR-RED"]).toJS());
    });

    it("should add 2 of the same styles and show only the latest style", () => {
      const newEditorState2 = addInlineStyle({
        editorState: newEditorState,
        value: "COLOR-GREEN",
        type: "textColor"
      });
      const override = newEditorState2.getInlineStyleOverride();
      expect(override.toJS()).toEqual(OrderedSet(["COLOR-GREEN"]).toJS());
    });

    it("should add 2 different styles to the same selection and show both", () => {
      const newEditorState2 = addInlineStyle({
        editorState: newEditorState,
        value: "FONTSIZE-12",
        type: "fontSizes"
      });
      const override = newEditorState2.getInlineStyleOverride();
      expect(override.toJS()).toEqual(
        OrderedSet(["COLOR-RED", "FONTSIZE-12"]).toJS()
      );
    });
  });
});

describe("inlineStyles - removeInlineStyle", () => {
  describe("non-collapsed section", () => {
    const editorState = new Raw()
      .addBlock("block 1")
      .anchorKey(0)
      .focusKey(5)
      .toEditorState();

    const newEditorState = addInlineStyle({
      editorState,
      value: "COLOR-RED",
      type: "textColor"
    });

    it("should remove the style from section", () => {
      const editorStateAfterRemove = removeInlineStyle({
        editorState: newEditorState,
        type: "textColor"
      });
      const inlineStyleRanges = blockInlineStyleRanges(
        editorStateAfterRemove,
        0
      );
      expect(inlineStyleRanges).toEqual([]);
    });
  });
});
