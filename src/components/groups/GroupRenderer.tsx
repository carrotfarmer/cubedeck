import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Group, Member } from "../../types";

interface GroupRendererProps {
  group: Group;
}

export const GroupRenderer: React.FC<GroupRendererProps> = ({ group }) => {
  return (
    <Box
      pt="5"
      borderRadius="md"
      boxShadow="sm"
      borderColor={group.grpColor.colorVal}
      borderWidth="thin"
      boxSize="sm"
      width="50"
      height="2xs"
    >
      <Flex>
        <Box pl="10">
          <Center>
            <Link href={`/group/${group.grpId}`}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={group.grpColor.colorVal}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {group.grpName}
              </Text>
            </Link>
          </Center>
          <Text pt="5">{group.grpBio}</Text>
          <Box>
            <Text fontWeight="bold" color={group.grpColor.colorVal}>
              Members
            </Text>
            <AvatarGroup>
              {group.grpMembers.map((member: Member) => (
                <Avatar
                  name={member.name}
                  src={member.profileImage}
                  size="sm"
                />
              ))}
            </AvatarGroup>
          </Box>
        </Box>
        <Spacer />
        <Box pr="5">
          <Avatar name={group.grpName} src={group.grpImg} size="xl" />
        </Box>
      </Flex>
    </Box>
  );
};
