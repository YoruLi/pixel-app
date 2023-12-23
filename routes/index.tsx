import { Head } from "$fresh/runtime.ts";
import Game from "../islands/game.tsx";
import { getGrid } from "../shared/db.ts";
export default async function Home() {
  const { tiles } = await getGrid();

  return (
    <div className="h-full overflow-hidden overflow-x-auto">
      <Head>
        <title>pixel-art</title>
      </Head>

      <Game initialStates={tiles} />
    </div>
  );
}
