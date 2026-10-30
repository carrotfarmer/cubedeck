import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase.config";
import { DEFAULT_PUZZLE_TYPE, puzzleTypes } from "../../constants";
import { Button, Dialog, DialogActions, Field, Input } from "../ui";
import { useToast } from "../ui/Providers";

export const CreateSession = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(""),
    [notes, setNotes] = useState(""),
    [puzzle, setPuzzle] = useState(DEFAULT_PUZZLE_TYPE);
  const [saving, setSaving] = useState(false);
  const toast = useToast(),
    router = useRouter();
  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !notes.trim() || !user || saving) return;
    setSaving(true);
    const id = v4();
    try {
      await setDoc(doc(db, user.uid, id), {
        sessionTitle: title.trim(),
        sessionNotes: notes.trim(),
        sessionType: puzzle,
        uuid: id,
        solves: [],
        createdAt: serverTimestamp(),
      });
      setOpen(false);
      setTitle("");
      setNotes("");
      setPuzzle(DEFAULT_PUZZLE_TYPE);
      await router.push(`/session/${id}`);
    } catch {
      toast({
        title: "Could not create session",
        description: "Please try again.",
        status: "error",
      });
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="Create session"
      trigger={
        <Button>
          <FiPlus size={14} />
          New session
        </Button>
      }
    >
      <form onSubmit={create}>
        <div className="space-y-4">
          <Field id="session-name" label="Name" required>
            <Input
              id="session-name"
              required
              placeholder="e.g. 3×3 practice"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <Field id="session-notes" label="Notes" required>
            <Input
              id="session-notes"
              required
              placeholder="Session notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
          <Field id="session-puzzle" label="Puzzle">
            <select
              id="session-puzzle"
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
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!title.trim() || !notes.trim()}
            loading={saving}
          >
            Create session
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
