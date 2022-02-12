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
