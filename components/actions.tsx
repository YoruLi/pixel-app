/** @jsxImportSource https://esm.sh/preact */

import { useState } from "preact/hooks";
import { ACTIONS, ACTIONS_NAME } from "../shared/constants.ts";
import { Loader } from "./loader.tsx";

export default function Actions() {
  const [isLoading, updateIsLoading] = useState<boolean>(false);

  const handleFunc = async (
    action: (typeof ACTIONS_NAME)[keyof typeof ACTIONS_NAME]
  ) => {
    if (action === "CLEAR ALL") {
      updateIsLoading(true);
      try {
        await fetch("/api/delete", {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error during API call:", error);
      } finally {
        // Introducir un pequeño retraso antes de desactivar el indicador de carga
        setTimeout(() => {
          updateIsLoading(false);
        }, 1000); // Ajusta el tiempo según sea necesario
      }
    }
  };

  return ACTIONS.map((action) => {
    return (
      <button
        key={action}
        className="text-white px-2 rounded hover:bg-slate-800 bg-slate-900 min-w-[80px] grid place-items-center"
        onClick={() => handleFunc(action)}
      >
        {isLoading ? <Loader /> : action}
      </button>
    );
  });
}
