import { Signal } from "https://esm.sh/*@preact/signals@1.2.1";
import { ACTIONS, COLORS } from "../shared/constants.ts";
import { Color } from "../shared/types.ts";
import Actions from "./actions.tsx";

export default function ColorPicker({
  selectedColor,
}: {
  selectedColor: Signal<Color>;
}) {
  return (
    <footer className="flex space-x-1 fixed bottom-4 mx-auto justify-center w-full">
      {COLORS.map((color) => {
        return (
          <button
            className={`
            w-8 h-8 border-4
              ${
                selectedColor.value === color
                  ? "border-white"
                  : "border-gray-800"
              }
            `}
            style={`background-color: ${color};`}
            onClick={() => {
              selectedColor.value = color;
            }}
          />
        );
      })}
      <Actions />
    </footer>
  );
}
