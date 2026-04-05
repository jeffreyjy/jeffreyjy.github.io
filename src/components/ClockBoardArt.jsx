import {
  ALL_PATTERNS,
  BLOOM,
  CHECKERBOARD,
  CHEVRONS,
  ClockBoard,
  CONVERGE,
  RADIAL,
  RINGS,
  VORTEX,
  WAVE,
  WINDMILL,
  clock,
  clockRandom,
  composeTime,
  random,
} from "clockboard";
import { useMemo } from "react";

const PATTERN_MAP = {
  RADIAL,
  CONVERGE,
  CHECKERBOARD,
  WAVE,
  VORTEX,
  RINGS,
  BLOOM,
  CHEVRONS,
  WINDMILL,
};

export default function ClockBoardArt({
  boardColor = "#1C1C1C",
  faceColor = "#1A1A1A",
  boardPadding = "",
  style = {},
  inverted = false,
  handColor = "",
  behavior = "default",
  patternName = "",
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
      : behavior === "randomHold10"
      ? random(ALL_PATTERNS, 10000, 10)
      : behavior === "randomFast"
        ? random(ALL_PATTERNS, 2000, 100)
        : behavior === "counterLoop"
          ? counterBehavior
          : undefined;
  const resolvedPattern = patternName ? PATTERN_MAP[patternName] : undefined;
  const behaviorProps = behaviorFn ? { behavior: behaviorFn } : {};
  const patternProps = resolvedPattern ? { pattern: resolvedPattern, duration: 0 } : {};
  const boardPaddingProps = boardPadding ? { boardPadding } : {};
  const styleProps = Object.keys(style).length > 0 ? { style } : {};
  return (
    <ClockBoard
      boardColor={boardColor}
      faceColor={faceColor}
      handColor={resolvedHandColor}
      {...boardPaddingProps}
      {...styleProps}
      {...(resolvedPattern ? patternProps : behaviorProps)}
    />
  );
}
