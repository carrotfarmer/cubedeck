import { Box, Button, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase.config";

interface GetStartedProps {}

export const GetStarted: React.FC<GetStartedProps> = ({}) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Box>
      <Center>
        <Heading bgGradient="linear(to-l, #f7ab48, #f0b581)" bgClip="text">
          Get Started
        </Heading>
      </Center>
      <Center pl="10">Ready to get started with your Cubedeck journey?</Center>
      <Center pt="5" pb="10">
        <Button
          colorScheme="orange"
          size="lg"
          onClick={() => signInWithGoogle()}
        >
          Sign-up with
          <Box pl="1">
            <FaGoogle size="20px" />
          </Box>
        </Button>
      </Center>
    </Box>
  );
};
