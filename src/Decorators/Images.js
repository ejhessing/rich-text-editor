import React from "react";

export const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "IMAGE"
    );
  }, callback);
};

export const Image = ({ children, contentState, entityKey, clickLink }) => {
  const { src, altText, width, height } = contentState
    .getEntity(entityKey)
    .getData();
  return <img src={src} alt={altText} height={height} width={width} />;
};
