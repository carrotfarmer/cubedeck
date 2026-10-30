import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { TimerWorkspace } from "../../../components/timer/TimerWorkspace";
import { PageState } from "../../../components/std/PageState";
import { auth, db } from "../../../firebase.config";

const TimerPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const groupId = router.query.groupId;
  if (loading || !router.isReady) return <PageState loading />;
  if (!user)
    return (
      <PageState
        title="Group timer"
        description="Sign in to record a solve for your group."
        signIn
      />
    );
  if (typeof groupId !== "string")
    return (
      <PageState
        title="Group not found"
        description="This group link is not available."
      />
    );
  const save = async (time: number) => {
    const minutes = Math.floor(time / 60000),
      seconds = Math.floor((time % 60000) / 1000);
    await updateDoc(doc(db, "groups", groupId), {
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
  };
  return (
    <TimerWorkspace
      onRecord={save}
      backHref={`/group/${groupId}`}
      backLabel="Group"
      context="Solves are saved to this group."
    />
  );
};
export default TimerPage;
