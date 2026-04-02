import { ALL_PATTERNS, ClockBoard, clock, clockRandom, composeTime, random } from "clockboard";
import { useMemo } from "react";

export default function ClockBoardArt({
  boardColor = "#1C1C1C",
  faceColor = "#1A1A1A",
  boardPadding = "",
  style = {},
  inverted = false,
  handColor = "",
  behavior = "default",
} = {}) {
  const resolvedHandColor = handColor || (inverted ? "#000000" : undefined);

  const counterBehavior = useMemo(
    () => apply => {
      let value = 0;
      const tick = () => {
        const hours = Math.floor(value / 100);
        const minutes = value % 100;
        apply(composeTime(hours, minutes), 450);
        value = (value + 1) % 10000;
      };

      tick();
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    },
    []
  );

  const behaviorFn =
    behavior === "clock"
      ? clock()
      : behavior === "homeClockRandom"
      ? clockRandom(undefined, undefined, undefined, undefined, 5000)
      : behavior === "random"
      ? random(ALL_PATTERNS)
      : behavior === "randomFast"
        ? random(ALL_PATTERNS, 3000, 1000)
        : behavior === "counterLoop"
          ? counterBehavior
          : undefined;
  const behaviorProps = behaviorFn ? { behavior: behaviorFn } : {};
  const boardPaddingProps = boardPadding ? { boardPadding } : {};
  const styleProps = Object.keys(style).length > 0 ? { style } : {};
  return (
    <ClockBoard
      boardColor={boardColor}
      faceColor={faceColor}
      handColor={resolvedHandColor}
      {...boardPaddingProps}
      {...styleProps}
      {...behaviorProps}
    />
  );
}
