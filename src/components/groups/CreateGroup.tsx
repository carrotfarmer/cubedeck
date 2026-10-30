import { doc, setDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";
import { DEFAULT_GROUP_COLOR, GROUP_COLORS } from "../../constants";
import { auth, db } from "../../firebase.config";
import { generateInviteCode } from "../../utils";
import { Button, Dialog, DialogActions, Field, Input } from "../ui";
import { useToast } from "../ui/Providers";

export const CreateGroup = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(""),
    [bio, setBio] = useState(""),
    [image, setImage] = useState(""),
    [color, setColor] = useState(DEFAULT_GROUP_COLOR.colorVal);
  const [saving, setSaving] = useState(false);
  const toast = useToast(),
    router = useRouter();
  const valid = name.trim().length >= 3 && bio.trim().length >= 3;
  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid || !user || saving) return;
    setSaving(true);
    const id = v4(),
      inviteCode = generateInviteCode(7),
      member = {
        name: user.displayName,
        uuid: user.uid,
        profileImage: user.photoURL,
      };
    try {
      await setDoc(doc(db, "groups", id), {
        grpName: name.trim(),
        grpBio: bio.trim(),
        grpImg: image.trim(),
        grpColor: GROUP_COLORS.find((item) => item.colorVal === color),
        grpId: id,
        grpOwner: member,
        grpMembers: [member],
        inviteCode,
        solves: [],
      });
      setOpen(false);
      setName("");
      setBio("");
      setImage("");
      try {
        await navigator.clipboard.writeText(inviteCode);
      } catch {
        /* The invite code is also shown on the group page. */
      }
      toast({ title: "Group created", status: "success" });
      await router.push(`/group/${id}`);
    } catch {
      toast({
        title: "Could not create group",
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
      title="Create group"
      trigger={
        <Button>
          <FiPlus size={14} />
          New group
        </Button>
      }
    >
      <form onSubmit={create}>
        <div className="space-y-4">
          <Field id="group-name" label="Name" required>
            <Input
              id="group-name"
              required
              minLength={3}
              value={name}
              placeholder="Group name"
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field id="group-description" label="Description" required>
            <Input
              id="group-description"
              required
              minLength={3}
              value={bio}
              placeholder="Group description"
              onChange={(e) => setBio(e.target.value)}
            />
          </Field>
          <Field id="group-color" label="Color">
            <select
              id="group-color"
              className="input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {GROUP_COLORS.map((item) => (
                <option key={item.colorVal} value={item.colorVal}>
                  {item.colorName}
                </option>
              ))}
            </select>
          </Field>
          <Field id="group-image" label="Image URL (optional)">
            <Input
              id="group-image"
              type="url"
              value={image}
              placeholder="https://…"
              onChange={(e) => setImage(e.target.value)}
            />
          </Field>
        </div>
        <DialogActions>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!valid} loading={saving}>
            Create group
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
