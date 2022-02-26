import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Group, Member } from "../../types";
import { truncate } from "../../utils";

interface GroupRendererProps {
  group: Group;
}

export const GroupRenderer: React.FC<GroupRendererProps> = ({ group }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
    >
      <Box
        pt="5"
        borderRadius="md"
        boxShadow="sm"
        borderColor={group.grpColor.colorVal}
        borderWidth="thin"
        width="50"
        height={["2xs", "xs", "xs", "2xs"]}
      >
        <Flex>
          <Box pl="10">
            <Center>
              <Link href={`/group/${group.grpId}`} passHref>
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
            <Text pt="2">{truncate(group.grpBio, 60)}</Text>
            <Box>
              <Text fontWeight="bold" color={group.grpColor.colorVal} pt="10">
                Members
              </Text>
              <AvatarGroup>
                {group.grpMembers.map((member: Member) => (
                  <Avatar
                    name={member.name}
                    src={member.profileImage}
                    size="sm"
                    key={member.uuid}
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
    </motion.div>
  );
};
