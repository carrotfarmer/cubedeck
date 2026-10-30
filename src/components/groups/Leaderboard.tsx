import { DocumentData } from "firebase/firestore";
import { FiAward } from "react-icons/fi";
import { GroupSolve } from "../../types";
import { displayTime } from "../std/StatCards";
import { Avatar } from "../ui";

export const Leaderboard = ({ group }: { group: DocumentData }) => {
  const solves = [...(group.solves as GroupSolve[])]
    .sort((a, b) => a.totalInSeconds - b.totalInSeconds)
    .slice(0, 5);
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full text-left text-xs">
        <caption className="sr-only">
          Top five solves for {group.grpName}
        </caption>
        <thead className="border-b border-line text-[10px] text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Rank</th>
            <th className="px-4 py-3 font-medium">Cuber</th>
            <th className="px-4 py-3 text-right font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {solves.map((solve, i) => (
            <tr key={solve.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2 font-mono text-muted">
                  {i + 1}
                  {i === 0 && (
                    <FiAward
                      size={13}
                      className="text-[#aa8b2b] dark:text-accent"
                    />
                  )}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Avatar
                    size="xs"
                    name={solve.member.name}
                    src={solve.member.profileImage}
                  />
                  {solve.member.name}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-mono">
                {displayTime(solve.totalInSeconds)}
              </td>
            </tr>
          ))}
          {!solves.length && (
            <tr>
              <td colSpan={3} className="px-4 py-9 text-center text-muted">
                No solves recorded.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
