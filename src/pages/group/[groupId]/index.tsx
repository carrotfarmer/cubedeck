import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  FiArrowLeft,
  FiClock,
  FiCopy,
  FiEdit2,
  FiLogOut,
  FiTrash2,
} from "react-icons/fi";
import { Navbar } from "../../../components/utils/nav/Navbar";
import { Footer } from "../../../components/std/Footer";
import { PageState } from "../../../components/std/PageState";
import { ConfirmDialog } from "../../../components/std/ConfirmDialog";
import { PageHead } from "../../../components/utils/PageHead";
import { GroupTabs } from "../../../components/groups/GroupTabs";
import {
  Avatar,
  Button,
  buttonClass,
  Dialog,
  DialogActions,
  Field,
  Input,
} from "../../../components/ui";
import { useToast } from "../../../components/ui/Providers";
import { GROUP_COLORS } from "../../../constants";
import { auth, db } from "../../../firebase.config";
import { Group } from "../../../types";

const GroupPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  if (loading || !router.isReady) return <PageState loading />;
  if (!user)
    return (
      <PageState
        title="Group"
        description="Sign in to view this group."
        signIn
      />
    );
  if (typeof router.query.groupId !== "string")
    return <PageState title="Group not found" />;
  return (
    <GroupDetail
      key={router.query.groupId}
      id={router.query.groupId}
      user={user}
    />
  );
};
const GroupDetail = ({ id, user }: { id: string; user: User }) => {
  const [data, loading, error] = useDocumentData(doc(db, "groups", id));
  const group = data as Group;
  const [editOpen, setEditOpen] = useState(false),
    [removeOpen, setRemoveOpen] = useState(false),
    [leaveOpen, setLeaveOpen] = useState(false);
  const [name, setName] = useState(""),
    [bio, setBio] = useState(""),
    [image, setImage] = useState(""),
    [color, setColor] = useState(""),
    [saving, setSaving] = useState(false);
  const toast = useToast(),
    router = useRouter();
  if (loading) return <PageState loading />;
  if (error)
    return (
      <PageState
        title="Could not load group"
        description="Please refresh and try again."
      />
    );
  if (!group)
    return (
      <PageState
        title="Group not found"
        description="It may have been deleted."
      />
    );
  if (!group.grpMembers.some((member) => member.uuid === user.uid))
    return (
      <PageState
        title="Group unavailable"
        description="Use an invite code on the Groups page to join this group."
      />
    );
  const owner = group.grpOwner.uuid === user.uid;
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 3 || bio.trim().length < 3 || saving) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "groups", id), {
        grpName: name.trim(),
        grpBio: bio.trim(),
        grpImg: image.trim(),
        grpColor:
          GROUP_COLORS.find((item) => item.colorVal === color) ||
          group.grpColor,
      });
      setEditOpen(false);
      toast({ title: "Group updated", status: "success" });
    } catch {
      toast({ title: "Could not update group", status: "error" });
    } finally {
      setSaving(false);
    }
  };
  const deleteGroup = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "groups", id));
      await router.push("/groups");
    } catch {
      toast({ title: "Could not delete group", status: "error" });
      setSaving(false);
    }
  };
  const leaveGroup = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "groups", id), {
        grpMembers: group.grpMembers.filter(
          (member) => member.uuid !== user.uid
        ),
        solves: group.solves.filter((solve) => solve.member.uuid !== user.uid),
      });
      await router.push("/groups");
    } catch {
      toast({ title: "Could not leave group", status: "error" });
      setSaving(false);
    }
  };
  return (
    <>
      <PageHead title={`${group.grpName} | Cubedeck`} />
      <Navbar />
      <main className="page">
        <Link href="/groups" passHref>
          <a className="text-link mb-5 inline-flex items-center gap-1.5 text-xs">
            <FiArrowLeft size={12} />
            Groups
          </a>
        </Link>
        <div className="page-header">
          <div className="flex min-w-0 items-start gap-3">
            <Avatar size="lg" name={group.grpName} src={group.grpImg} />
            <div className="min-w-0">
              <h1 className="page-title break-words">{group.grpName}</h1>
              <p className="mt-1 text-[11px] text-muted">
                {group.grpMembers.length}{" "}
                {group.grpMembers.length === 1 ? "member" : "members"}
              </p>
              {group.grpBio && (
                <p className="mt-2 max-w-md text-xs text-muted">
                  {group.grpBio}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {owner ? (
              <>
                <Button
                  small
                  variant="secondary"
                  onClick={() => {
                    setName(group.grpName);
                    setBio(group.grpBio);
                    setImage(group.grpImg);
                    setColor(group.grpColor.colorVal);
                    setEditOpen(true);
                  }}
                >
                  <FiEdit2 size={12} />
                  Edit
                </Button>
                <Button
                  small
                  variant="ghost"
                  aria-label="Delete group"
                  onClick={() => setRemoveOpen(true)}
                >
                  <FiTrash2 size={12} />
                </Button>
              </>
            ) : (
              <Button
                small
                variant="secondary"
                onClick={() => setLeaveOpen(true)}
              >
                <FiLogOut size={12} />
                Leave
              </Button>
            )}
            <Link href={`/group/${id}/timer`} passHref>
              <a className={buttonClass("primary", true)}>
                <FiClock size={12} />
                Timer
              </a>
            </Link>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="text-muted">Invite code</span>
          <code className="rounded border border-line bg-soft px-2 py-0.5 text-xs">
            {group.inviteCode}
          </code>
          <Button
            variant="ghost"
            small
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(group.inviteCode);
                toast({ title: "Invite code copied", status: "success" });
              } catch {
                toast({
                  title: "Could not copy invite code",
                  description: "Select the code and copy it manually.",
                  status: "error",
                });
              }
            }}
          >
            <FiCopy size={12} />
            Copy
          </Button>
        </div>
        <GroupTabs group={group} loggedInUser={user} />
      </main>
      <Footer />
      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit group">
        <form onSubmit={save}>
          <div className="space-y-4">
            <Field id="edit-group-name" label="Name" required>
              <Input
                id="edit-group-name"
                required
                minLength={3}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field id="edit-group-bio" label="Description" required>
              <Input
                id="edit-group-bio"
                required
                minLength={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Field>
            <Field id="edit-group-color" label="Color">
              <select
                id="edit-group-color"
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
            <Field id="edit-group-image" label="Image URL (optional)">
              <Input
                id="edit-group-image"
                type="url"
                value={image}
                placeholder="https://…"
                onChange={(e) => setImage(e.target.value)}
              />
            </Field>
          </div>
          <DialogActions>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={saving}
              disabled={name.trim().length < 3 || bio.trim().length < 3}
            >
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog
        isOpen={removeOpen}
        onClose={() => setRemoveOpen(false)}
        onConfirm={deleteGroup}
        loading={saving}
        title="Delete group?"
        description="The group and all its solves will be permanently deleted."
      />
      <ConfirmDialog
        isOpen={leaveOpen}
        onClose={() => setLeaveOpen(false)}
        onConfirm={leaveGroup}
        loading={saving}
        title="Leave group?"
        confirmLabel="Leave group"
        description="Your solves will be removed from this group. You can rejoin with an invite code."
      />
    </>
  );
};
export default GroupPage;
