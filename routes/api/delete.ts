import { type Handlers } from "https://deno.land/x/fresh@1.6.1/server.ts";

import { clearGrid } from "../../shared/db.ts";

export const handler: Handlers = {
  async DELETE() {
    const result = await clearGrid();

    if (!result) {
      return Response.json({ error: "Unable to clear grid." });
    }

    const { tiles, versionstamps } = result;

    return Response.json({ tiles, versionstamps });
  },
};
