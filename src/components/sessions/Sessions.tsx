import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { Session } from "../../types";
import { CreateSession } from "./CreateSession";
import { SessionRenderer } from "./SessionRenderer";
import { PersonalStats } from "./PersonalStats";
import { StatCards, displayTime } from "../std/StatCards";
import { Notice, Tabs } from "../ui";

export const Sessions = () => {
  const [user] = useAuthState(auth);
  const [sessions, loading, error] = useCollectionData(
    query(collection(db, user.uid), orderBy("createdAt", "desc"))
  );
  const allSessions = (sessions || []) as Session[];
  const times = allSessions.flatMap((session) =>
    session.solves.map((solve) => solve.totalInSeconds)
  );
  return (
    <main className="page">
      <div className="page-header">
        <h1 className="page-title">Sessions</h1>
        <CreateSession />
      </div>
      <div className="mb-6">
        <StatCards
          stats={[
            { label: "Sessions", value: loading ? "—" : allSessions.length },
            { label: "Solves", value: loading ? "—" : times.length },
            {
              label: "Personal best",
              value: times.length ? displayTime(Math.min(...times)) : "—",
              accent: true,
            },
          ]}
        />
      </div>
      <Tabs
        label="Practice"
        tabs={[
          {
            value: "sessions",
            label: "Sessions",
            content: loading ? (
              <Notice>Loading sessions…</Notice>
            ) : error ? (
              <Notice error>
                Could not load sessions. Please refresh and try again.
              </Notice>
            ) : allSessions.length ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {allSessions.map((session) => (
                  <SessionRenderer session={session} key={session.uuid} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-line px-5 py-12 text-center">
                <h2 className="text-xl">No sessions yet</h2>
                <p className="mt-2 text-xs text-muted">
                  Create a session to start saving solves.
                </p>
              </div>
            ),
          },
          {
            value: "stats",
            label: "Statistics",
            content: <PersonalStats user={user} />,
          },
        ]}
      />
    </main>
  );
};
