import { Box, Center, Code, Heading, Text, Image } from "@chakra-ui/react";
import React from "react";
import { Features } from "./FeaturesSection";
import { GetStarted } from "./GetStarted";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <Box pt="10">
      <Center>
        <Heading
          fontSize={{ base: "36px", md: "40px", lg: "56px" }}
          bgGradient="linear(to-l, #f7ab48, #f0b581)"
          bgClip="text"
        >
          Welcome to Cubedeck!
        </Heading>
      </Center>
      <Center>
        <Text
          fontSize={{ base: "12px", md: "20px", lg: "20px" }}
          fontFamily="mono"
        >
          Taking your cubing skills to the moon! 🚀🌕
        </Text>
      </Center>
      <Center>
        <Image
          src="https://www.pinclipart.com/picdir/big/541-5413373_clip-art-png-download.png"
          boxSize="36"
          pt="5"
        />
      </Center>
      <Box pt="10">
        <Features />
      </Box>
      <Box pt="10">
        <GetStarted />
      </Box>
    </Box>
  );
};
