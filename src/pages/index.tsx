import React, { ReactElement } from "react";
import { auth } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "../components/std/Navbar";
import { Box, Divider, Spinner, Text } from "@chakra-ui/react";
import { Sessions } from "../components/sessions/Sessions";
import Head from "next/head";
import { LandingPage } from "../components/lpg/LandingPage";

const Index = (): ReactElement<any, any> => {
  const [user, loading, error] = useAuthState(auth);

  // The auth state is being fetched. Displaying a spinner
  if (loading) {
    return (
      <React.Fragment>
        <Head>
          <title>Cubedeck</title>
        </Head>
        <Box textAlign={"center"} pt="25%">
          <Spinner />
        </Box>
      </React.Fragment>
    );
  }

  // The user is successfully logged in
  if (user) {
    return (
      <React.Fragment>
        <Head>
          <title>Cubedeck | {user.displayName}</title>
        </Head>
        <Box>
          <Navbar props={undefined} />
          <Sessions />
          <Divider pt="10" />
        </Box>
      </React.Fragment>
    );
  }

  // there was an authentication error
  if (error) {
    return (
      <React.Fragment>
        <Head>
          <title>Cubedeck: Error</title>
        </Head>
        <Box>
          <Navbar props={undefined} />
          <Text fontWeight="bold" color="red.200">
            Oopsie-doopsies! There was a glitch on our side...
          </Text>
        </Box>
      </React.Fragment>
    );
  }

  // User is not logged in
  return (
    <React.Fragment>
      <Head>
        <title>Cubedeck</title>
      </Head>
      <Box>
        <Navbar props={undefined} />
        <LandingPage />
      </Box>
    </React.Fragment>
  );
};

export default Index;
