import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";

// custom font
import "@fontsource/fjalla-one";
import { CreateSession } from "./CreateSession";
import { collection } from "firebase/firestore";
import { Session } from "../types";

interface SessionsProps {}

export const Sessions: React.FC<SessionsProps> = ({}) => {
  const [user, loading, error] = useAuthState(auth);
  const [sessions, loadingSessions, errorSessions] = useCollectionData(
    collection(db, `${user.uid}`)
  );

  if (loadingSessions) {
    return <Text>Loading sessions data...</Text>;
  }

  if (error) {
    return <Text>BRUH</Text>;
  }

  console.log(sessions);

  return (
    <Box textAlign="center" pt="5%">
      <Text fontSize="3xl" fontWeight="bold" style={styles}>
        {user.displayName}'s Practice Sessions
      </Text>{" "}
      {sessions.map((session: Session) => (
        <Text>{session.sessionTitle}</Text>
      ))}
      <CreateSession />
    </Box>
  );
};

const styles = {
  fontFamily: "Fjalla One",
};
