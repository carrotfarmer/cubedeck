import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase.config";
import { Button, Dialog, DialogActions, Field, Input } from "../ui";
import { useToast } from "../ui/Providers";

export const JoinGroup = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(""),
    [saving, setSaving] = useState(false);
  const toast = useToast(),
    router = useRouter();
  const join = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!code.trim() || !user || saving) return;
    setSaving(true);
    try {
      const result = await getDocs(
        query(collection(db, "groups"), where("inviteCode", "==", code.trim()))
      );
      if (result.empty) {
        toast({
          title: "Invite code not found",
          description: "Check the code and try again.",
          status: "error",
        });
        return;
      }
      const group = result.docs[0].data();
      await updateDoc(doc(db, "groups", group.grpId), {
        grpMembers: arrayUnion({
          name: user.displayName,
          uuid: user.uid,
          profileImage: user.photoURL,
        }),
      });
      setOpen(false);
      setCode("");
      await router.push(`/group/${group.grpId}`);
    } catch {
      toast({
        title: "Could not join group",
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
      title="Join group"
      description="Enter an invite code from a friend."
      trigger={<Button variant="secondary">Join group</Button>}
    >
      <form onSubmit={join}>
        <Field id="invite-code" label="Invite code" required>
          <Input
            id="invite-code"
            required
            value={code}
            placeholder="e.g. 2MJ9xb9"
            className="font-mono"
            onChange={(e) => setCode(e.target.value)}
          />
        </Field>
        <DialogActions>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!code.trim()} loading={saving}>
            Join group
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
