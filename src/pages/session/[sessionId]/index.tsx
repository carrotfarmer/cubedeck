import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FiArrowLeft, FiClock, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Navbar } from "../../../components/utils/nav/Navbar";
import { Footer } from "../../../components/std/Footer";
import { PageState } from "../../../components/std/PageState";
import { ConfirmDialog } from "../../../components/std/ConfirmDialog";
import { PageHead } from "../../../components/utils/PageHead";
import { SessionTabs } from "../../../components/sessions/SessionTabs";
import {
  Button,
  buttonClass,
  Dialog,
  DialogActions,
  Field,
  Input,
} from "../../../components/ui";
import { useToast } from "../../../components/ui/Providers";
import { puzzleTypes } from "../../../constants";
import { auth, db } from "../../../firebase.config";
import { Session } from "../../../types";

const SessionPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  if (loading || !router.isReady) return <PageState loading />;
  if (!user)
    return (
      <PageState
        title="Session"
        description="Sign in to view this session."
        signIn
      />
    );
  if (typeof router.query.sessionId !== "string")
    return <PageState title="Session not found" />;
  return (
    <SessionDetail
      key={router.query.sessionId}
      id={router.query.sessionId}
      userId={user.uid}
    />
  );
};
const SessionDetail = ({ id, userId }: { id: string; userId: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, userId, id));
  const session = data as Session;
  const [editOpen, setEditOpen] = useState(false),
    [removeOpen, setRemoveOpen] = useState(false);
  const [title, setTitle] = useState(""),
    [notes, setNotes] = useState(""),
    [puzzle, setPuzzle] = useState("3x3"),
    [saving, setSaving] = useState(false);
  const toast = useToast(),
    router = useRouter();
  if (loading) return <PageState loading />;
  if (error)
    return (
      <PageState
        title="Could not load session"
        description="Please refresh and try again."
      />
    );
  if (!session)
    return (
      <PageState
        title="Session not found"
        description="It may have been deleted."
      />
    );
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || saving) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, userId, id), {
        sessionTitle: title.trim(),
        sessionNotes: notes.trim(),
        sessionType: puzzle,
      });
      setEditOpen(false);
      toast({ title: "Session updated", status: "success" });
    } catch {
      toast({ title: "Could not update session", status: "error" });
    } finally {
      setSaving(false);
    }
  };
  const deleteSession = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, userId, id));
      await router.push("/");
    } catch {
      toast({ title: "Could not delete session", status: "error" });
      setSaving(false);
    }
  };
  return (
    <>
      <PageHead title={`${session.sessionTitle} | Cubedeck`} />
      <Navbar />
      <main className="page">
        <Link href="/" passHref>
          <a className="text-link mb-5 inline-flex items-center gap-1.5 text-xs">
            <FiArrowLeft size={12} />
            Sessions
          </a>
        </Link>
        <div className="page-header">
          <div className="min-w-0">
            <h1 className="page-title break-words">{session.sessionTitle}</h1>
            <div className="mt-2 flex items-center gap-3">
              <span className="badge">
                {session.sessionType === "Pyramix"
                  ? "Pyraminx"
                  : session.sessionType}
              </span>
              <span className="text-[11px] text-muted">
                {session.solves.length} solves
              </span>
            </div>
            {session.sessionNotes && (
              <p className="mt-3 max-w-lg text-xs text-muted">
                {session.sessionNotes}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Button
              small
              variant="secondary"
              onClick={() => {
                setTitle(session.sessionTitle);
                setNotes(session.sessionNotes || "");
                setPuzzle(session.sessionType);
                setEditOpen(true);
              }}
            >
              <FiEdit2 size={12} />
              Edit
            </Button>
            <Button
              small
              variant="ghost"
              aria-label="Delete session"
              onClick={() => setRemoveOpen(true)}
            >
              <FiTrash2 size={12} />
            </Button>
            <Link href={`/session/${id}/timer`} passHref>
              <a className={buttonClass("primary", true)}>
                <FiClock size={12} />
                Timer
              </a>
            </Link>
          </div>
        </div>
        <SessionTabs session={session} />
      </main>
      <Footer />
      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit session">
        <form onSubmit={save}>
          <div className="space-y-4">
            <Field id="edit-session-name" label="Name" required>
              <Input
                id="edit-session-name"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field id="edit-session-notes" label="Notes">
              <Input
                id="edit-session-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Field>
            <Field id="edit-session-puzzle" label="Puzzle">
              <select
                id="edit-session-puzzle"
                className="input"
                value={puzzle}
                onChange={(e) => setPuzzle(e.target.value)}
              >
                {puzzleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "Pyramix" ? "Pyraminx" : type}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <DialogActions>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()} loading={saving}>
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog
        isOpen={removeOpen}
        onClose={() => setRemoveOpen(false)}
        onConfirm={deleteSession}
        loading={saving}
        title="Delete session?"
        description="The session and all its solves will be permanently deleted."
      />
    </>
  );
};
export default SessionPage;
