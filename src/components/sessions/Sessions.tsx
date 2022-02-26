import {
  Box,
  Center,
  GridItem,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { CreateSession } from "./CreateSession";
import { collection, orderBy, query } from "firebase/firestore";
import { Session } from "../../types";
import { SessionRenderer } from "./SessionRenderer";
import { PersonalStats } from "./PersonalStats";

interface SessionsProps {}

export const Sessions: React.FC<SessionsProps> = ({}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sessions, loadingSessions, errorSessions] = useCollectionData(
    query(collection(db, user.uid), orderBy("createdAt", "desc"))
  );

  if (loadingSessions) {
    return <Text>Loading sessions data...</Text>;
  }

  if (error) {
    return (
      <Text>
        There was an error fetching your sessions! Please reload the page.
      </Text>
    );
  }

  return (
    <Box>
      <Tabs variant="solid-rounded" colorScheme="yellow" pt="5">
        <Center>
          <TabList
            border="1px"
            borderRadius="xl"
            p="4"
            borderColor="yellow.500"
          >
            <Tab>Sessions</Tab>
            <Tab>Stats</Tab>
          </TabList>
        </Center>
        <TabPanels pt="5">
          <TabPanel>
            <Heading fontSize="4xl" fontWeight="bold" textAlign="center">
              My Practice Sessions
            </Heading>{" "}
            <Center>
              <CreateSession />
            </Center>
            <SimpleGrid
              columns={[1, 1, 1, 2, 3]}
              spacingY={6}
              // spacingX={}
              pt="10"
              pl="5"
              pr="5"
            >
              {sessions.map((session: Session) => (
                <GridItem key={session.uuid}>
                  <Center>
                    <SessionRenderer session={session} />
                  </Center>
                </GridItem>
              ))}
            </SimpleGrid>
            {sessions.length === 0 && (
              <>
                <Center>
                  <Text pt="10">
                    Nothing here yet! Create a session, time yourself and add
                    your solve times to get started!
                  </Text>
                </Center>
              </>
            )}
          </TabPanel>
          <TabPanel>
            <Center>
              <PersonalStats user={user} />
            </Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
