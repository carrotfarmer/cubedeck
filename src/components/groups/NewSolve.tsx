import { updateDoc, doc, arrayUnion, DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { auth, db } from "../../firebase.config";
import { AddSolveDialog } from "../solves/AddSolveDialog";

export const NewSolve = ({ group }: { group: DocumentData }) => {
  const [user] = useAuthState(auth);
  return (
    <AddSolveDialog
      onSave={async (minutes, seconds) => {
        await updateDoc(doc(db, "groups", group.grpId), {
          solves: arrayUnion({
            minutes,
            seconds,
            totalInSeconds: minutes * 60 + seconds,
            id: v4(),
            member: {
              name: user.displayName,
              uuid: user.uid,
              profileImage: user.photoURL,
            },
          }),
        });
      }}
    />
  );
};
