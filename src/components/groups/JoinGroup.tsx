import { Box, Button } from "@chakra-ui/react";
import React from "react";

interface JoinGroupProps {}

export const JoinGroup: React.FC<JoinGroupProps> = ({}) => {
  return (
    <Box pt="10">
      <Button colorScheme="yellow">Join Group</Button>
    </Box>
  );
};
