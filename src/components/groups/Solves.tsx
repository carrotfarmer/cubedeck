import { DocumentData } from "firebase/firestore";
import { GroupSolve } from "../../types";
import { NewSolve } from "./NewSolve";
import { GroupSolveRenderer } from "./GroupSolveRenderer";

export const Solves = ({ group }: { group: DocumentData }) => (
  <div>
    <p className="mb-4 text-xs text-muted">
      {group.solves.length} {group.solves.length === 1 ? "solve" : "solves"}
    </p>
    <div className="solve-grid">
      <NewSolve group={group} />
      {group.solves.map((solve: GroupSolve) => (
        <GroupSolveRenderer
          key={solve.id}
          solve={solve}
          groupColor={group.grpColor}
          group={group}
        />
      ))}
    </div>
  </div>
);
