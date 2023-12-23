/** @jsxImportSource https://esm.sh/preact */

import { ACTIONS, ACTIONS_NAME } from "../shared/constants.ts";

export default function Actions() {
  const handleFunc = async (
    action: (typeof ACTIONS_NAME)[keyof typeof ACTIONS_NAME]
  ) => {
    if (action === "CLEAR ALL") {
      return await fetch("/api/delete", {
        method: "DELETE",
      });
    }
  };

  return ACTIONS.map((action) => {
    return (
      <button
        key={action}
        className="text-white px-2"
        onClick={() => handleFunc(action)}
      >
        {action}
      </button>
    );
  });
}
