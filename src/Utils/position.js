/* eslint-disable no-useless-escape */
const isSafari = () => {
  return (
    typeof navigator !== "undefined" &&
    /Version\/[\d\.]+.*Safari/.test(navigator.userAgent)
  );
};

export const getPosition = selected => {
  let range = selected.getRangeAt(0);

  // Hack for Safari
  if (isSafari()) {
    range = range.cloneRange();
    range.setStart(range.startContainer, 0);
  }

  return range.getBoundingClientRect();
};
