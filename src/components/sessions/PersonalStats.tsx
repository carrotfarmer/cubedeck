import { User } from "firebase/auth";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase.config";
import { StatCards, displayTime } from "../std/StatCards";
import { Session } from "../../types";
import { Notice } from "../ui";

export const PersonalStats = ({ user }: { user: User }) => {
  const [sessions, loading, error] = useCollectionData(
    collection(db, user.uid)
  );
  if (loading) return <Notice>Loading statistics…</Notice>;
  if (error)
    return <Notice error>Could not load statistics. Please try again.</Notice>;
  const times = ((sessions || []) as Session[]).flatMap((session) =>
    session.solves.map((solve) => solve.totalInSeconds)
  );
  const average = times.length
    ? times.reduce((a, b) => a + b, 0) / times.length
    : Infinity;
  return (
    <StatCards
      stats={[
        {
          label: "Personal best",
          value: displayTime(Math.min(...times)),
          accent: true,
        },
        {
          label: "Average",
          value: displayTime(average),
          hint: times.length
            ? `${times.length} solves across all sessions`
            : undefined,
        },
        {
          label: "Slowest",
          value: displayTime(times.length ? Math.max(...times) : Infinity),
        },
      ]}
    />
  );
};
