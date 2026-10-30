import { Session } from "../../types";
import { Solves } from "../solves/Solves";
import { SessionsStats } from "./SessionsStats";
import { Tabs } from "../ui";

export const SessionTabs = ({ session }: { session: Session }) => (
  <Tabs
    label="Session"
    tabs={[
      {
        value: "solves",
        label: "Solves",
        content: <Solves session={session} />,
      },
      {
        value: "stats",
        label: "Statistics",
        content: <SessionsStats session={session} />,
      },
    ]}
  />
);
