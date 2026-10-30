import { DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";
import { Members } from "./Members";
import { Solves } from "./Solves";
import { Leaderboard } from "./Leaderboard";
import { GroupStats } from "./GroupStats";
import { Tabs } from "../ui";

export const GroupTabs = ({
  group,
  loggedInUser,
}: {
  group: DocumentData;
  loggedInUser: User;
}) => (
  <Tabs
    label="Group"
    tabs={[
      { value: "solves", label: "Solves", content: <Solves group={group} /> },
      {
        value: "leaderboard",
        label: "Leaderboard",
        content: <Leaderboard group={group} />,
      },
      {
        value: "stats",
        label: "Statistics",
        content: <GroupStats group={group} />,
      },
      {
        value: "members",
        label: "Members",
        content: (
          <Members
            groupMembers={group.grpMembers}
            group={group}
            loggedInUser={loggedInUser}
          />
        ),
      },
    ]}
  />
);
