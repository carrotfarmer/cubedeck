import {
  Box,
  Tabs,
  Center,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import { Session } from "../../types";
import { Solves } from "../solves/Solves";
import { SessionsStats } from "./SessionsStats";

interface SessionTabsProps {
  session: Session;
}

export const SessionTabs: React.FC<SessionTabsProps> = ({ session }) => {
  return (
    <Box>
      <Tabs variant="solid-rounded" colorScheme="cyan">
        <Center>
          <TabList border="1px" borderRadius="xl" p="4" borderColor="blue.100">
            <Tab>Solves</Tab>
            <Tab>Stats</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel>
            <Solves session={session} />
          </TabPanel>
          <TabPanel>
            <Center>
              <SessionsStats session={session} />
            </Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
