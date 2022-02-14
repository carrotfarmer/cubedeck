import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FeaturesGrid } from "./FeaturesGrid";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <Box>
      <Center>
        <Heading bgClip="text" bgGradient="linear(to-l, #45ccc8, #1b77e0)">
          Features
        </Heading>
      </Center>
      <Box pt="5">
        <FeaturesGrid />
      </Box>
    </Box>
  );
};
