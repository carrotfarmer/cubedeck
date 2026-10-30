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
  const sessionId = router.query.sessionId;
  if (loading || !router.isReady) return <PageState loading />;
  if (!user)
    return (
      <PageState
        title="Session timer"
        description="Sign in to save solves to this session."
        signIn
      />
    );
  if (typeof sessionId !== "string")
    return (
      <PageState
        title="Session not found"
        description="This session link is not available."
      />
    );
  const save = async (time: number) => {
    const minutes = Math.floor(time / 60000),
      seconds = Math.floor((time % 60000) / 1000);
    await updateDoc(doc(db, user.uid, sessionId), {
      solves: arrayUnion({
        minutes,
        seconds,
        milliseconds: time % 1000,
        totalInSeconds: minutes * 60 + seconds,
        totalInMilliseconds: time,
        id: v4(),
      }),
    });
  };
  return (
    <TimerWorkspace
      onRecord={save}
      backHref={`/session/${sessionId}`}
      backLabel="Session"
      context="Solves are saved to this session."
    />
  );
};
export default TimerPage;
