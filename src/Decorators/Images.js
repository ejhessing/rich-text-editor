import React from "react";
import { imageWidth } from "../Constants/maxSize";

export const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "IMAGE"
    );
  }, callback);
};

export const Image = ({ contentState, entityKey }) => {
  const { src, altText, width, height } = contentState
    .getEntity(entityKey)
    .getData();

  return (
    <div style={{ width: imageWidth }}>
      <img src={src} alt={altText} width={width} height={height} />
    </div>
  );
};
