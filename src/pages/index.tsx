import React from "react";
import { auth } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "../components/Navbar";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Sessions } from "../components/Sessions";

const Index = () => {
  const [user, loading, error] = useAuthState(auth);

  // The auth state is being fetched. Displaying a spinner
  if (loading) {
    return (
      <Box textAlign={"center"} pt="25%">
        <Spinner />
      </Box>
    );
  }

  // The user is successfully logged in
  if (user) {
    return (
      <Box>
        <Navbar props={undefined} />
        <Sessions />
      </Box>
    );
  }

  // there was an authentication error
  if (error) {
    return (
      <Box>
        <Navbar props={undefined} />
        <Text fontWeight="bold" color="red.200">
          Oopsie-doopsies! There was a glitch on our side...
        </Text>
      </Box>
    );
  }

  // User is not logged in
  return (
    <Box>
      <Navbar props={undefined} />
      <div>Not logged in</div>
    </Box>
  );
};

export default Index;
