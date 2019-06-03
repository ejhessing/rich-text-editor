import React from "react";

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

const Link = ({ children, contentState, entityKey }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return <a href={url}>{children}</a>;
};

const hyperlinkDecorator = {
  strategy: findLinkEntities,
  component: Link
};

export default hyperlinkDecorator;
