import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

// custom font
import "@fontsource/fjalla-one";
import { CreateSession } from "./CreateSession";

interface SessionsProps {}

export const Sessions: React.FC<SessionsProps> = ({}) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Box textAlign="center" pt="5%">
      <Text fontSize="3xl" fontWeight="bold" style={styles}>
        {user.displayName}'s Practice Sessions
      </Text>{" "}
      <CreateSession />
    </Box>
  );
};

const styles = {
  fontFamily: "Fjalla One",
};
