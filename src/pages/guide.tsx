import { Box, Center, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Navbar } from "../components/std/Navbar";

const GuidePage: NextPage = () => {
  return (
    <Box>
      <Navbar />
      <Center pt="5">
        <Heading fontSize="4xl">Cubedeck Guide</Heading>
      </Center>
      <Center pt="2.5">
        <Text>
          This page will guide you through all of Cubedeck&apos;s awesome
          features!
        </Text>
      </Center>
    </Box>
  );
};

export default GuidePage;
