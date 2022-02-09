import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
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
import { Subheading } from "../../constants";

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
      <Text fontSize="3xl" fontWeight="bold" style={Subheading}>
        {user.displayName}'s Practice Sessions
      </Text>{" "}
      <Grid templateColumns="repeat(5, 1fr)" gap={6} pr="2%" pl="2%" pt="2%">
        {sessions.map((session: Session) => (
          <GridItem>
            <SessionRenderer session={session} />
          </GridItem>
        ))}
      </Grid>
      <CreateSession />
    </Box>
  );
};