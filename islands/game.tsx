import { Color } from "../shared/types.ts";
import { COLORS } from "../shared/constants.ts";
import ColorPicker from "../components/color-picker.tsx";
import { useSignal } from "https://esm.sh/*@preact/signals@1.2.1";

import Actions from "../components/actions.tsx";
import Tiles from "../components/tiles.tsx";

interface GameProps {
  initialStates: Color[];
}

export default function Game(props: GameProps) {
  const grid = useSignal<Color[]>(props.initialStates);
  const selected = useSignal<Color>(COLORS[0]);

  return (
    <>
      <Tiles grid={grid} selectedColor={selected} />
      <ColorPicker selectedColor={selected} />
    </>
  );
}
