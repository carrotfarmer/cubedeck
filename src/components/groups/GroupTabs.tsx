import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Center,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { Members } from "./Members";
import { Solves } from "./Solves";
import { User } from "firebase/auth";
import { Leaderboard } from "./Leaderboard";

interface GroupTabsProps {
  group: DocumentData;
  loggedInUser: User;
}

export const GroupTabs: React.FC<GroupTabsProps> = ({
  group,
  loggedInUser,
}) => {
  return (
    <Box>
      <Tabs
        variant="solid-rounded"
        colorScheme={group.grpColor.colorVal.split(".")[0]}
      >
        <Center>
          <TabList
            border="1px"
            borderRadius="xl"
            p="4"
            borderColor={group.grpColor.colorVal}
          >
            <Tab>Solves</Tab>
            <Tab>Leaderboard</Tab>
            <Tab>Members</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel>
            <Solves group={group} />
          </TabPanel>
          <TabPanel>
            <Leaderboard group={group} />
          </TabPanel>

          <TabPanel>
            <Members
              groupMembers={group.grpMembers}
              group={group}
              loggedInUser={loggedInUser}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
