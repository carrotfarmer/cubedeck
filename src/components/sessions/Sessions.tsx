import {
  Box,
  Center,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";

// custom font
import "@fontsource/fjalla-one";

import { CreateSession } from "./CreateSession";
import { collection } from "firebase/firestore";
import { Session } from "../../types";
import { SessionRenderer } from "./SessionRenderer";

interface SessionsProps {}

export const Sessions: React.FC<SessionsProps> = ({}) => {
  const [user, loading, error] = useAuthState(auth);
  const [sessions, loadingSessions, errorSessions] = useCollectionData(
    collection(db, user.uid)
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
    <Box textAlign="center" pt="5%">
      <Heading fontSize="4xl" fontWeight="bold">
        My Practice Sessions
      </Heading>{" "}
      <SimpleGrid columns={[1, null, 3]} spacingY={6} pt="10">
        {sessions.map((session: Session) => (
          <GridItem>
            <Center>
              <SessionRenderer session={session} />
            </Center>
          </GridItem>
        ))}
      </SimpleGrid>
      <CreateSession />
      {sessions.length === 0 && (
        <>
          <Center>
            <Text pt="10">Nothing here yet!</Text>
          </Center>
        </>
      )}
    </Box>
  );
};
