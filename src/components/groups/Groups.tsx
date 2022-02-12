import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { CreateGroup } from "./CreateGroup";

interface GroupsProps {}

export const Groups: React.FC<GroupsProps> = ({}) => {
  return (
    <Box pt="10">
      <Center>
        <Heading fontSize="3xl" fontWeight="bold">
          My Groups
        </Heading>
      </Center>
      <Center>
        <CreateGroup />
      </Center>
    </Box>
  );
};
