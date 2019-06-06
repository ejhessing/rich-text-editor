import React from "react";

export const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

export const Link = ({ children, contentState, entityKey, clickLink }) => {
  const { link } = contentState.getEntity(entityKey).getData();
  return (
    <a href={link} onClick={clickLink}>
      {children}
    </a>
  );
};
