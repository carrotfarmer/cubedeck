import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { NewSolve } from "./NewSolve";
import { Members } from "./Members";
import { Solves } from "./Solves";

interface GroupTabsProps {
  group: DocumentData;
}

export const GroupTabs: React.FC<GroupTabsProps> = ({ group }) => {
  return (
    <Box>
      <Tabs
        variant="solid-rounded"
        colorScheme={group.grpColor.colorVal.split(".")[0]}
      >
        <TabList>
          <Tab>Solves</Tab>
          <Tab>Leaderboard</Tab>
          <Tab>Members</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Solves group={group} />
          </TabPanel>
          <TabPanel>This is the leaderboard page</TabPanel>

          <TabPanel>
            <Members groupMembers={group.grpMembers} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
