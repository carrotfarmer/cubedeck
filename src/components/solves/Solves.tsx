import { Session } from "../../types";
import { NewSolve } from "./NewSolve";
import { SolveRenderer } from "./SolveRenderer";

export const Solves = ({ session }: { session: Session }) => (
  <div>
    <p className="mb-4 text-xs text-muted">
      {session.solves.length} {session.solves.length === 1 ? "solve" : "solves"}
    </p>
    <div className="solve-grid">
      <NewSolve session={session} />
      {session.solves.map((solve) => (
        <SolveRenderer solve={solve} session={session} key={solve.id} />
      ))}
    </div>
  </div>
);
