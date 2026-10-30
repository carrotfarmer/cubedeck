import { User } from "firebase/auth";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { FiLogOut } from "react-icons/fi";
import { Member } from "../../types";
import { db } from "../../firebase.config";
import { Avatar } from "../ui";
import { useToast } from "../ui/Providers";

export const Members = ({
  groupMembers,
  group,
  loggedInUser,
}: {
  groupMembers: Member[];
  group: DocumentData;
  loggedInUser: User;
}) => {
  const toast = useToast();
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {groupMembers.map((member) => (
        <div
          className="panel flex items-center gap-3 px-4 py-3"
          key={member.uuid}
        >
          <Avatar size="sm" name={member.name} src={member.profileImage} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">
              {member.name}
              {member.uuid === loggedInUser.uid ? " (you)" : ""}
            </p>
            <p className="mt-0.5 text-[10px] text-muted">
              {group.grpOwner.uuid === member.uuid ? "Owner" : "Member"}
            </p>
          </div>
          {group.grpOwner.uuid === loggedInUser.uid &&
            group.grpOwner.uuid !== member.uuid && (
              <button
                type="button"
                className="icon-btn"
                aria-label={`Remove ${member.name} from group`}
                onClick={async () => {
                  try {
                    await updateDoc(doc(db, "groups", group.grpId), {
                      grpMembers: groupMembers.filter(
                        (item) => item.uuid !== member.uuid
                      ),
                      solves: group.solves.filter(
                        (solve) => solve.member.uuid !== member.uuid
                      ),
                    });
                  } catch {
                    toast({
                      title: "Could not remove member",
                      status: "error",
                    });
                  }
                }}
              >
                <FiLogOut size={13} />
              </button>
            )}
        </div>
      ))}
    </div>
  );
};
