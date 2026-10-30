import { DocumentData } from "firebase/firestore";
import { GroupSolve } from "../../types";
import { StatCards, displayTime } from "../std/StatCards";

export const GroupStats = ({ group }: { group: DocumentData }) => {
  const solves = group.solves as GroupSolve[];
  const members = group.grpMembers.map((member) => {
    const times = solves
      .filter((solve) => solve.member.uuid === member.uuid)
      .map((solve) => solve.totalInSeconds);
    return {
      ...member,
      count: times.length,
      average: times.length
        ? times.reduce((a, b) => a + b, 0) / times.length
        : Infinity,
    };
  });
  const contributor = [...members].sort((a, b) => b.count - a.count)[0];
  const fastest = [...members]
    .filter((member) => member.count)
    .sort((a, b) => a.average - b.average)[0];
  const best = [...solves].sort(
    (a, b) => a.totalInSeconds - b.totalInSeconds
  )[0];
  return (
    <StatCards
      stats={[
        {
          label: "Group average",
          value: displayTime(
            solves.length
              ? solves.reduce((a, b) => a + b.totalInSeconds, 0) / solves.length
              : Infinity
          ),
          hint: `${solves.length} solves · ${members.length} ${
            members.length === 1 ? "member" : "members"
          }`,
        },
        {
          label: "Most solves",
          value: solves.length ? contributor?.name : "—",
          hint: solves.length
            ? `${contributor?.count} recorded solves`
            : undefined,
        },
        {
          label: "Best average",
          value: displayTime(fastest?.average ?? Infinity),
          hint: fastest?.name,
        },
        {
          label: "Fastest solve",
          value: displayTime(best?.totalInSeconds ?? Infinity),
          hint: best?.member.name,
          accent: true,
        },
      ]}
    />
  );
};
