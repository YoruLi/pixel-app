/** @jsxImportSource https://esm.sh/preact */

import { useState } from "preact/hooks";
import { ACTIONS_NAME } from "../shared/constants.ts";
import { Loader } from "./loader.tsx";
import { Svg } from "./svg.tsx";
import svgs from "../shared/svgs.ts";

export default function Actions() {
  const [isLoading, updateIsLoading] = useState<boolean>(false);

  const handleFunc = async (
    action: (typeof ACTIONS_NAME)[keyof typeof ACTIONS_NAME]
  ) => {
    if (action === "CLEAR_ALL") {
      updateIsLoading(true);
      try {
        await fetch("/api/delete", {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error during API call:", error);
      } finally {
        setTimeout(() => {
          updateIsLoading(false);
        }, 1000);
      }
    }
  };

  const ACTIONS = [
    {
      label: "delete",
      action: "CLEAR_ALL",
      icon: (
        <Svg path={svgs.deleteIcon.path} viewbox={svgs.deleteIcon.viewBox} />
      ),
    },
  ];

  return ACTIONS.map((action) => {
    return (
      <button
        key={action.label}
        className="text-black px-2 py-1 rounded hover:bg-slate-100 bg-white  grid place-items-center font-bold mx-2"
        onClick={() => handleFunc(action.action)}
      >
        {isLoading ? <Loader /> : action.icon}
      </button>
    );
  });
}
