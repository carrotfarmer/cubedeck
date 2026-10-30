import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { Session } from "../../types";
import { displayTime } from "../std/StatCards";

export const SessionRenderer = ({ session }: { session: Session }) => {
  const best = session.solves.length
    ? Math.min(...session.solves.map((solve) => solve.totalInSeconds))
    : Infinity;
  return (
    <Link href={`/session/${session.uuid}`} passHref>
      <a className="panel flex min-h-[166px] flex-col p-4 transition-colors hover:border-[#bba34f]">
        <div className="mb-3 flex items-center justify-between">
          <span className="badge">
            {session.sessionType === "Pyramix"
              ? "Pyraminx"
              : session.sessionType}
          </span>
          <FiArrowUpRight className="text-muted" size={14} />
        </div>
        <h2 className="break-words font-sans text-sm font-medium leading-snug">
          {session.sessionTitle}
        </h2>
        {session.sessionNotes && (
          <p className="mt-1.5 line-clamp-2 text-xs text-muted">
            {session.sessionNotes}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-5 text-[10px] text-muted">
          <span>{session.solves.length} solves</span>
          <span>
            Best{" "}
            <span className="ml-1 font-mono text-ink">{displayTime(best)}</span>
          </span>
        </div>
      </a>
    </Link>
  );
};
