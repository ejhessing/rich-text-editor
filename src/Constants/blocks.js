export const blockMap = type => {
  switch (type) {
    case "LEFT-ALIGN":
      return "leftAlign";
    case "RIGHT-ALIGN":
      return "rightAlign";
    case "CENTER-ALIGN":
      return "centerAlign";
    case "JUSTIFY-ALIGN":
      return "justifyAlign";
    default:
      return "";
  }
};
