import { Session } from "../../types";
import { StatCards, displayTime } from "../std/StatCards";

export const SessionsStats = ({ session }: { session: Session }) => {
  const times = session.solves.map((solve) => solve.totalInSeconds);
  const average = times.length
    ? times.reduce((a, b) => a + b, 0) / times.length
    : Infinity;
  return (
    <StatCards
      stats={[
        { label: "Solves", value: times.length },
        {
          label: "Average",
          value: displayTime(average),
        },
        {
          label: "Fastest",
          value: displayTime(Math.min(...times)),
          accent: true,
          hint:
            times.length && average > 0
              ? `${Math.round(
                  (1 - Math.min(...times) / average) * 100
                )}% faster than average`
              : undefined,
        },
        {
          label: "Slowest",
          value: displayTime(times.length ? Math.max(...times) : Infinity),
          hint:
            times.length && average > 0
              ? `${Math.round(
                  (Math.max(...times) / average - 1) * 100
                )}% slower than average`
              : undefined,
        },
      ]}
    />
  );
};
