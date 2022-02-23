import { Box, Center, Text, Link } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box bgColor="yellow.200">
      <Center>
        <Text pt="5" color="yellow.800" fontWeight="bold" height="16">
          &copy; 2022 Dhruva Srinivas &bull;{" "}
          <Link
            href="https://github.com/carrotfarmer/cubedeck"
            target="_blank"
            color="blue.400"
          >
            GitHub
          </Link>
        </Text>
      </Center>
    </Box>
  );
};
