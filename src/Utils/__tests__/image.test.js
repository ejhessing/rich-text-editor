import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { insertImage } from "../image";

const src = "https://somerandomurl.com";
const altText = "some random alt text";
const height = 100;
const width = 50;
describe("Images - insertLink", () => {
  const contentBlocks = convertFromHTML("<div>test</div>");
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it("should add an image", () => {
    const newEditorState = insertImage({
      editorState,
      src,
      altText
    });
    const contentState = newEditorState.getCurrentContent();
    const data = contentState.getEntity("1").getData();
    expect(data.src).toBe(src);
    expect(data.altText).toBe(altText);
  });

  it("should add an image with the width and height if added", () => {
    const newEditorState = insertImage({
      editorState,
      src,
      altText,
      height,
      width
    });

    const contentState = newEditorState.getCurrentContent();
    const data = contentState.getEntity("2").getData();
    expect(data.src).toBe(src);
    expect(data.altText).toBe(altText);
    expect(data.height).toBe(height);
    expect(data.width).toBe(width);
  });
});
