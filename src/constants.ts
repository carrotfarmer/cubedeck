import { GroupColor } from "./types";

// All the supported puzzle types
export const puzzleTypes: string[] = [
  "2x2",
  "3x3",
  "4x4",
  "5x5",
  "6x6",
  "7x7",
  "Pyramix",
];

// Default type will be 3x3 coz... duh.
export const DEFAULT_PUZZLE_TYPE: string = "3x3";

export const GROUP_COLORS: GroupColor[] = [
  { colorVal: "orange.300", colorName: "Orange" },
  { colorVal: "blue.300", colorName: "Blue" },
  { colorVal: "green.300", colorName: "Green" },
  { colorVal: "yellow.300", colorName: "Yellow" },
  { colorVal: "red.300", colorName: "Red" },
  { colorVal: "pink.300", colorName: "Pink" },
  { colorVal: "purple.300", colorName: "Purple" },
  { colorVal: "cyan.300", colorName: "Cyan" },
];

export const DEFAULT_GROUP_COLOR: GroupColor = {
  colorVal: "orange.300",
  colorName: "Orange",
};

export const LINEAR_GRADIENT_THEME: string = "linear(to-l, #deb462, #c28610)";

// Preserve the existing group color values stored in Firestore.
export const groupAccent = (token: string): string =>
  ({
    orange: "#d5a269",
    blue: "#80a6c6",
    green: "#8aaa79",
    yellow: "#d6bf6a",
    red: "#c98d81",
    pink: "#c998af",
    purple: "#ab98c5",
    cyan: "#80b5b7",
  }[token.split(".")[0]] || "#d6bf6a");
