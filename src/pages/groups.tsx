import { collection, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CreateGroup } from "../components/groups/CreateGroup";
import { GroupRenderer } from "../components/groups/GroupRenderer";
import { JoinGroup } from "../components/groups/JoinGroup";
import { Footer } from "../components/std/Footer";
import { Navbar } from "../components/utils/nav/Navbar";
import { PageHead } from "../components/utils/PageHead";
import { PageState } from "../components/std/PageState";
import { Notice } from "../components/ui";
import { auth, db } from "../firebase.config";
import { Group } from "../types";

const Groups = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <PageState loading />;
  if (!user)
    return (
      <PageState
        title="Groups"
        description="Sign in to create or join a group."
        signIn
      />
    );
  return <GroupList userId={user.uid} />;
};
const GroupList = ({ userId }: { userId: string }) => {
  const [groups, loading, error] = useCollectionData(
    query(collection(db, "groups"), orderBy("grpName", "asc"))
  );
  const myGroups = ((groups || []) as Group[]).filter((group) =>
    group.grpMembers.some((member) => member.uuid === userId)
  );
  return (
    <>
      <PageHead title="Groups | Cubedeck" />
      <Navbar />
      <main className="page">
        <div className="page-header">
          <h1 className="page-title">Groups</h1>
          <div className="flex gap-2">
            <JoinGroup />
            <CreateGroup />
          </div>
        </div>
        {loading ? (
          <Notice>Loading groups…</Notice>
        ) : error ? (
          <Notice error>
            Could not load groups. Please refresh and try again.
          </Notice>
        ) : myGroups.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {myGroups.map((group) => (
              <GroupRenderer key={group.grpId} group={group} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-line px-5 py-12 text-center">
            <h2 className="text-xl">No groups yet</h2>
            <p className="mt-2 text-xs text-muted">
              Create a group or join one with an invite code.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
export default Groups;
