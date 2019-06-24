const textColor = {
  "COLOR-BLACK": {
    color: "black"
  },
  "COLOR-RED": {
    color: "red"
  },
  "COLOR-BLUE": {
    color: "blue"
  },
  "COLOR-GREEN": {
    color: "green"
  },
  "COLOR-YELLOW": {
    color: "yellow"
  },
  "COLOR-PURPLE": {
    color: "purple"
  },
  "COLOR-ORANGE": {
    color: "orange"
  },
  "COLOR-PINK": {
    color: "pink"
  },
  "COLOR-GOLD": {
    color: "gold"
  },
  "COLOR-TEAL": {
    color: "teal"
  }
};

const highlightColor = {
  "BACKGROUND-WHITE": {
    backgroundColor: "white"
  },
  "BACKGROUND-RED": {
    backgroundColor: "red"
  },
  "BACKGROUND-BLUE": {
    backgroundColor: "blue"
  },
  "BACKGROUND-GREEN": {
    backgroundColor: "green"
  },
  "BACKGROUND-YELLOW": {
    backgroundColor: "yellow"
  },
  "BACKGROUND-PURPLE": {
    backgroundColor: "purple"
  },
  "BACKGROUND-ORANGE": {
    backgroundColor: "orange"
  },
  "BACKGROUND-PINK": {
    backgroundColor: "pink"
  },
  "BACKGROUND-GOLD": {
    backgroundColor: "gold"
  },
  "BACKGROUND-TEAL": {
    backgroundColor: "teal"
  }
};

const fontSizes = {
  "FONTSIZE-12": {
    fontSize: "12px"
  },
  "FONTSIZE-16": {
    fontSize: "16px"
  },
  "FONTSIZE-20": {
    fontSize: "20px"
  },
  "FONTSIZE-24": {
    fontSize: "24px"
  },
  "FONTSIZE-30": {
    fontSize: "30px"
  }
};

const fontFamily = {
  "FONT-ARIAL": {
    fontFamily: "Arial"
  },
  "FONT-TIMES-NEW-ROMAN": {
    fontFamily: "Times New Roman"
  },
  "FONT-COMIC-SANS-MS": {
    fontFamily: "Comic Sans MS"
  },
  "FONT-COURIER-NEW": {
    fontFamily: "Courier New"
  },
  "FONT-IMPACT": {
    fontFamily: "Impact"
  }
};

const styles = {
  textColor,
  highlightColor,
  fontSizes,
  fontFamily
};

export const styleMap = {
  ...textColor,
  ...highlightColor,
  ...fontSizes,
  ...fontFamily
};

export default styles;
