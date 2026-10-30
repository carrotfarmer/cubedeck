import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { auth, db } from "../../firebase.config";
import { Session } from "../../types";
import { AddSolveDialog } from "./AddSolveDialog";

export const NewSolve = ({ session }: { session: Session }) => {
  const [user] = useAuthState(auth);
  return (
    <AddSolveDialog
      onSave={async (minutes, seconds) => {
        await updateDoc(doc(db, user.uid, session.uuid), {
          solves: arrayUnion({
            minutes,
            seconds,
            totalInSeconds: minutes * 60 + seconds,
            id: v4(),
          }),
        });
      }}
    />
  );
};
