import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { Group } from "../../types";
import { Avatar } from "../ui";
import { groupAccent } from "../../constants";

export const GroupRenderer = ({ group }: { group: Group }) => (
  <Link href={`/group/${group.grpId}`} passHref>
    <a
      className="panel flex min-h-[166px] flex-col border-t-2 p-4 transition-colors hover:border-x-[#bba34f] hover:border-b-[#bba34f]"
      style={{ borderTopColor: groupAccent(group.grpColor.colorVal) }}
    >
      <div className="mb-3 flex items-center justify-between">
        <Avatar name={group.grpName} src={group.grpImg} size="sm" />
        <FiArrowUpRight size={14} className="text-muted" />
      </div>
      <h2 className="break-words font-sans text-sm font-medium">
        {group.grpName}
      </h2>
      {group.grpBio && (
        <p className="mt-1.5 line-clamp-2 text-xs text-muted">{group.grpBio}</p>
      )}
      <div className="mt-auto flex items-center justify-between pt-5">
        <div className="flex -space-x-1.5">
          {group.grpMembers.slice(0, 4).map((member) => (
            <Avatar
              size="xs"
              key={member.uuid}
              name={member.name}
              src={member.profileImage}
            />
          ))}
        </div>
        <span className="text-[10px] text-muted">
          {group.grpMembers.length}{" "}
          {group.grpMembers.length === 1 ? "member" : "members"}
        </span>
      </div>
    </a>
  </Link>
);
