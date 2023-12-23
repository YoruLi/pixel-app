import { COLORS_NAME, HEIGHT, KEYS_DB, WIDTH } from "./constants.ts";
import { Color, Grid } from "./types.ts";

const db = await Deno.openKv();

export const updateGrid = async ({
  index,
  color,
}: {
  index: number;
  color: Color;
}) => {
  const { versionstamp } = await db.set([KEYS_DB.tiles, index], color);
  const bc = new BroadcastChannel("PIXEL_UPDATE");

  bc.postMessage({ index, color, versionstamp });

  setTimeout(() => bc.close(), 5);
  return versionstamp;
};

export const getGrid = async (): Promise<Grid> => {
  const tiles = new Array(WIDTH * HEIGHT).fill(COLORS_NAME.black);
  const versionstamps = new Array(WIDTH * HEIGHT).fill("");
  const pixels = db.list<string>({ prefix: [KEYS_DB.tiles] });

  for await (const pixel of pixels) {
    const index = pixel.key[1] as number;
    tiles[index] = pixel.value;
    versionstamps[index] = pixel.versionstamp;
  }

  return {
    tiles,
    versionstamps,
  };
};

export const clearGrid = async () => {
  const pixels = db.list<string>({ prefix: [KEYS_DB.tiles] });
  const bc = new BroadcastChannel("PIXEL_UPDATE");

  for await (const pixel of pixels) {
    await db.delete([KEYS_DB.tiles, pixel.key[1]]);
  }

  const { tiles, versionstamps } = await getGrid();
  bc.postMessage({ type: "delete", tiles, versionstamps });

  setTimeout(() => bc.close(), 5);
  return {
    tiles,
    versionstamps,
  };
};
