import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { LINEAR_GRADIENT_THEME } from "../../constants";
import { FeaturesGrid } from "./FeaturesGrid";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <Box>
      <Center>
        <Heading bgClip="text" bgGradient={LINEAR_GRADIENT_THEME}>
          Features
        </Heading>
      </Center>
      <Box pt="5">
        <FeaturesGrid />
      </Box>
    </Box>
  );
};
