import { Signal } from "https://esm.sh/*@preact/signals@1.2.1";
import { Color } from "../shared/types.ts";
import { COLORS_NAME, PIXEL_SIZE, WIDTH } from "../shared/constants.ts";
import { useEffect } from "preact/hooks";
export default function Tiles({
  grid,
  selectedColor,
}: {
  grid: Signal<Color[]>;
  selectedColor: Color;
}) {
  useEffect(() => {
    const eventSource = new EventSource("/api/listen");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "delete") {
        grid.value = data.tiles;
      } else {
        const { index, color } = data;
        const gridValue = grid.value;
        grid.value = gridValue.with(index, color);
      }
    };

    return () => eventSource.close();
  }, []);

  const updateGrid = async (index: number, selectedColor: Color) => {
    const response = await fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index, color: selectedColor }),
    });

    if (!response.ok) {
      console.error("Failed to update grid");
      return;
    }

    const { versionstamp }: { versionstamp: string } = await response.json();
    const gridValue = grid.value;
    grid.values = gridValue.with(index, selectedColor);
  };

  return (
    <div
      className="grid"
      style={`
   
        width: ${WIDTH * PIXEL_SIZE}px;
        grid-template-columns: repeat(${WIDTH}, 1fr);
      `}
    >
      {grid.value.map((color, index) => (
        <div className="relative group">
          <div
            className="relative "
            style={`
               border: 1px solid rgba(255,255,255, 0.1);
              width: ${PIXEL_SIZE}px;
              height: ${PIXEL_SIZE}px;
              background-color: ${color}
            `}
            onClick={() => {
              updateGrid(index, selectedColor);
            }}
          />

          {color !== COLORS_NAME.black ? (
            <div className="absolute pointer-events-none group-hover:block hidden rounded px-2 py-1 bg-white/50 -top-6 left-6 z-20 select-none">
              {color}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
