import { Avatar, Box, Center, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Member } from "../../types";

interface MembersProps {
  groupMembers: Member[];
}

export const Members: React.FC<MembersProps> = ({ groupMembers }) => {
  return (
    <Box>
      <Center>
        <Heading>Members</Heading>
      </Center>
      <Box pt="5">
        {groupMembers.map((member) => (
          <Box key={member.uuid} pt="5">
            <Center>
              <HStack>
                <Avatar src={member.profileImage} size="sm" />
                <Text>{member.name}</Text>
              </HStack>
            </Center>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
