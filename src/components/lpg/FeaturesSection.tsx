import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FeaturesGrid } from "./FeaturesGrid";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <Box>
      <Center>
        <Heading bgGradient="linear(to-l, #f7ab48, #f0b581)" bgClip="text">
          Features
        </Heading>
      </Center>
      <Box pt="5">
        <FeaturesGrid />
      </Box>
    </Box>
  );
};
