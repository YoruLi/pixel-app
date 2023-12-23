import { type Handlers } from "https://deno.land/x/fresh@1.6.1/server.ts";

import { clearGrid } from "../../shared/db.ts";

export const handler: Handlers = {
  async DELETE() {
    const { tiles, versionstamps } = await clearGrid();

    return Response.json({ tiles, versionstamps });
  },
};
