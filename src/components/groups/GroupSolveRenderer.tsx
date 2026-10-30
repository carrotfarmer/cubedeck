import { FiTrash2 } from "react-icons/fi";
import { updateDoc, doc, DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth, db } from "../../firebase.config";
import { GroupColor, GroupSolve } from "../../types";
import { groupAccent } from "../../constants";
import { displayTime } from "../std/StatCards";
import { Avatar } from "../ui";
import { useToast } from "../ui/Providers";

export const GroupSolveRenderer = ({
  solve,
  groupColor,
  group,
}: {
  solve: GroupSolve;
  groupColor: GroupColor;
  group: DocumentData;
}) => {
  const [user] = useAuthState(auth);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  const canDelete =
    user &&
    (user.uid === solve.member.uuid || user.uid === group.grpOwner.uuid);
  const remove = async () => {
    if (!canDelete || deleting) return;
    setDeleting(true);
    try {
      await updateDoc(doc(db, "groups", group.grpId), {
        solves: group.solves.filter((item) => item.id !== solve.id),
      });
      toast({ title: "Solve deleted", status: "info" });
    } catch {
      toast({ title: "Could not delete solve", status: "error" });
      setDeleting(false);
    }
  };
  return (
    <div
      className="solve-card border-t-2"
      style={{ borderTopColor: groupAccent(groupColor.colorVal) }}
    >
      {canDelete && (
        <button
          type="button"
          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded text-muted/60 hover:bg-soft hover:text-red-500 disabled:opacity-30"
          aria-label={`Delete solve by ${solve.member.name}`}
          onClick={remove}
          disabled={deleting}
        >
          {deleting ? (
            <span className="spinner h-3 w-3" />
          ) : (
            <FiTrash2 size={11} />
          )}
        </button>
      )}
      <span className="mt-2 font-mono text-xl">
        {displayTime(solve.totalInSeconds)}
      </span>
      <div className="mt-2 flex max-w-full items-center gap-1.5">
        <Avatar
          size="xs"
          name={solve.member.name}
          src={solve.member.profileImage}
        />
        <span className="truncate text-[9px] text-muted">
          {solve.member.name?.split(" ")[0]}
        </span>
      </div>
    </div>
  );
};
