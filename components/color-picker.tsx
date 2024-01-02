import { Signal } from "https://esm.sh/*@preact/signals@1.2.1";
import { COLORS } from "../shared/constants.ts";
import { Color } from "../shared/types.ts";
import Actions from "./actions.tsx";

export default function ColorPicker({
  selectedColor,
}: {
  selectedColor: Signal<Color>;
}) {
  return (
    <footer className="flex space-x-6 fixed bottom-4 left-0 right-0 mx-auto justify-center w-full">
      <div className="space-x-2 flex items-center">
        {COLORS.map((color) => {
          return (
            <button
              className={`
            w-8 h-8 rounded-full 
              ${
                selectedColor.value === color
                  ? " outline-2 outline outline-offset-[2px] outline-white"
                  : "outline"
              }
            `}
              style={{
                backgroundColor: `${color}`,
                boxShadow:
                  "inset 0 0 0 2px rgba(255, 255, 255, 0.12), 0 0 0.12em rgba(0, 0, 0, 0.12)",
              }}
              onClick={() => {
                selectedColor.value = color;
              }}
            />
          );
        })}
      </div>
      <Actions />
    </footer>
  );
}
