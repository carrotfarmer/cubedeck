export const prettify = (val: number): string => {
  if (val < 10) {
    return `0${val}`;
  }
  return val.toString();
};

export const sessionTagColor = (sessionType: string): string => {
  switch (sessionType) {
    case "2x2":
      return "orange";
    case "3x3":
      return "blue";
    case "4x4":
      return "green";
    case "5x5":
      return "teal";
    case "6x6":
      return "yellow";
    case "7x7":
      return "red";
    case "Pyramix":
      return "pink";
  }
};

export const convertToMinutesAndSeconds = (
  seconds: number
): {
  minutes: number;
  seconds: number;
} => {
  return {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60,
  };
};
