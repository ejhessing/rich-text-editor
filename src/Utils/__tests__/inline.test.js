import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw
} from "draft-js";
import { OrderedSet } from "immutable";

import {
  addInlineStyle,
  removeInlineStyle,
  toggleInlineStyle
} from "../inlineStyles";

const contentBlocks = convertFromHTML("<div>test</div>");
const contentState = ContentState.createFromBlockArray(contentBlocks);
const emptyEditorState = EditorState.createWithContent(contentState);

const blockInlineStyleRanges = (editorState, i = 0) => {
  return convertToRaw(editorState.getCurrentContent()).blocks[i]
    .inlineStyleRanges;
};

describe("inlineStyles - addInlineStyle", () => {
  describe("Non-collapsed section", () => {
    const addSelection = emptyEditorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 4
    });

    const editorState = EditorState.acceptSelection(
      emptyEditorState,
      addSelection
    );

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
          length: 4,
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
          length: 4,
          offset: 0
        }
      ]);
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
    const addSelection = emptyEditorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 4
    });

    const editorState = EditorState.acceptSelection(
      emptyEditorState,
      addSelection
    );

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

describe("inlineStyles - toggle", () => {
  describe("non-collapsed section", () => {
    const addSelection = emptyEditorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 4
    });

    const editorState = EditorState.acceptSelection(
      emptyEditorState,
      addSelection
    );

    const newEditorState = toggleInlineStyle({
      editorState,
      type: "BOLD"
    });

    it("should add the style when toggled", () => {
      const inlineStyleRanges = blockInlineStyleRanges(newEditorState, 0);
      expect(inlineStyleRanges).toEqual([
        { length: 4, offset: 0, style: "BOLD" }
      ]);
    });

    it("should remove the style if style already on", () => {
      const newEditorState2 = toggleInlineStyle({
        editorState: newEditorState,
        type: "BOLD"
      });

      const inlineStyleRanges = blockInlineStyleRanges(newEditorState2, 0);
      expect(inlineStyleRanges).toEqual([]);
    });
  });

  describe("collapsed section", () => {
    const addSelection = emptyEditorState.getSelection().merge({
      anchorOffset: 7,
      focusOffset: 7
    });

    const editorState = EditorState.acceptSelection(
      emptyEditorState,
      addSelection
    );

    const newEditorState = toggleInlineStyle({
      editorState,
      type: "BOLD"
    });

    it("should add the style when toggled", () => {
      const override = newEditorState.getInlineStyleOverride();
      expect(override.toJS()).toEqual(OrderedSet(["BOLD"]).toJS());
    });

    it("should remove the style if style already on", () => {
      const newEditorState2 = toggleInlineStyle({
        editorState: newEditorState,
        type: "BOLD"
      });

      const override = newEditorState2.getInlineStyleOverride();
      expect(override.toJS()).toEqual(OrderedSet([]).toJS());
    });

    it("should add a second style if another style already on", () => {
      const newEditorState2 = toggleInlineStyle({
        editorState: newEditorState,
        type: "ITALIC"
      });

      const override = newEditorState2.getInlineStyleOverride();
      expect(override.toJS()).toEqual(OrderedSet(["BOLD", "ITALIC"]).toJS());
    });
  });
});
