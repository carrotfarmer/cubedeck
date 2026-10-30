import { FiTrash2 } from "react-icons/fi";
import { updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth, db } from "../../firebase.config";
import { Session, Solve } from "../../types";
import { displayTime } from "../std/StatCards";
import { useToast } from "../ui/Providers";

export const SolveRenderer = ({
  solve,
  session,
}: {
  solve: Solve;
  session: Session;
}) => {
  const [user] = useAuthState(auth);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  const remove = async () => {
    if (!user || deleting) return;
    setDeleting(true);
    try {
      await updateDoc(doc(db, user.uid, session.uuid), {
        solves: session.solves.filter((item) => item.id !== solve.id),
      });
      toast({ title: "Solve deleted", status: "info" });
    } catch {
      toast({ title: "Could not delete solve", status: "error" });
      setDeleting(false);
    }
  };
  return (
    <div className="solve-card">
      <button
        type="button"
        className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded text-muted/60 hover:bg-soft hover:text-red-500 disabled:opacity-30"
        aria-label={`Delete solve ${displayTime(solve.totalInSeconds)}`}
        onClick={remove}
        disabled={deleting}
      >
        {deleting ? (
          <span className="spinner h-3 w-3" />
        ) : (
          <FiTrash2 size={11} />
        )}
      </button>
      <span className="font-mono text-xl">
        {displayTime(solve.totalInSeconds)}
      </span>
    </div>
  );
};
