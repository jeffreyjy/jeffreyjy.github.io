import {
  ALL_PATTERNS,
  BLOOM,
  CHECKERBOARD,
  CHEVRONS,
  CONVERGE,
  INWARD,
  RADIAL,
  RINGS,
  VORTEX,
  WAVE,
  WINDMILL,
  ClockBoard,
  alive,
  aliveTime,
  clock,
  clockRandom,
  concentricDance,
  gentleDrift,
  random,
  composeTime,
  stagger,
  uniformPattern,
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
  INWARD,
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
        apply(composeTime(hours, minutes), {
          duration: 450,
          onComplete: () => {},
        });
        value = (value + 1) % 10000;
      };

      tick();
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    },
    []
  );

  const spinRevealBehavior = useMemo(
    () => apply => {
      const start = uniformPattern(0, 180);
      const time = composeTime(new Date().getHours(), new Date().getMinutes());
      apply(start, {
        duration: 3000,
        onComplete: () => {
          apply(time, {
            spinRevolutions: 2,
            revolutionDuration: 5000,
            stagger: stagger.centerOut(1500),
          });
        },
      });
      return () => {};
    },
    []
  );

  const behaviorFn =
    behavior === "aliveTime"
      ? aliveTime()
      : behavior === "alive"
        ? alive()
        : behavior === "clock"
          ? clock()
          : behavior === "clockRandom"
            ? clockRandom()
            : behavior === "concentricDance"
              ? concentricDance()
              : behavior === "gentleDrift"
                ? gentleDrift()
                : behavior === "random"
                  ? random(ALL_PATTERNS)
                  : behavior === "randomFast"
                    ? random(ALL_PATTERNS, 2000, 100)
                    : behavior === "spinReveal"
                      ? spinRevealBehavior
                      : behavior === "counterLoop"
                        ? counterBehavior
                        : undefined;

  const resolvedPattern = patternName ? PATTERN_MAP[patternName] : undefined;
  const behaviorProps = behaviorFn ? { behavior: behaviorFn } : {};
  const patternProps = resolvedPattern
    ? { pattern: resolvedPattern, duration: 0 }
    : {};
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
