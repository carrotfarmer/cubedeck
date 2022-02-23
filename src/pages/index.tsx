import React, { ReactElement } from "react";
import { auth } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "../components/std/Navbar";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Sessions } from "../components/sessions/Sessions";
import { LandingPage } from "../components/lpg/LandingPage";
import { PageHead } from "../components/utils/PageHead";
import { Footer } from "../components/std/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Index = (): ReactElement<any, any> => {
  const [user, loading, error] = useAuthState(auth);

  // The auth state is being fetched. Displaying a spinner
  if (loading) {
    return (
      <React.Fragment>
        <PageHead title="Cubedeck" />
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
        <PageHead title={`Cubedeck | ${user.displayName}`} />
        <Box>
          <Navbar />
          <Box pb="15%">
            <Sessions />
          </Box>

          <Footer />
        </Box>
      </React.Fragment>
    );
  }

  // there was an authentication error
  if (error) {
    return (
      <React.Fragment>
        <PageHead title="Cubedeck: Error" />
        <Box>
          <Navbar />
          <Text fontWeight="bold" color="red.200">
            Oopsie-doopsies! There was a glitch on our side...
          </Text>
        </Box>
        <Footer />
      </React.Fragment>
    );
  }

  // User is not logged in
  return (
    <React.Fragment>
      <PageHead title="Cubedeck" />
      <Box>
        <Navbar />
        <LandingPage />
        <Footer />
      </Box>
    </React.Fragment>
  );
};

export default Index;
