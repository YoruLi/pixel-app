export const WIDTH = 64;
export const HEIGHT = 64;

export const PIXEL_SIZE = 32;

export const COLORS_NAME = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
  brightBlue: "#00FFFF",
  white: "#FFFFFF",
  black: "#000000",
} as const;

export const COLORS = Object.values(COLORS_NAME);

export const KEYS_DB = {
  tiles: "tiles",
} as const;

export const ACTIONS_NAME = {
  CLEAR_ALL: "CLEAR_ALL",
} as const;

export const ACTIONS = Object.values(ACTIONS_NAME);
