import { DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Center,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { FaCrown } from "react-icons/fa";
import { Member } from "../../types";
import { removeFromGroup } from "../../utils";

interface MembersProps {
  groupMembers: Member[];
  group: DocumentData;
  loggedInUser: User;
}

export const Members: React.FC<MembersProps> = ({
  groupMembers,
  group,
  loggedInUser,
}) => {
  return (
    <Box>
      <Box pt="2.5">
        {groupMembers.map((member) => (
          <Box key={member.uuid} pt="5">
            <Center>
              <HStack>
                <Avatar src={member.profileImage} size="sm" />
                <HStack>
                  <HStack>
                    <Text>{member.name}</Text>
                    {group.grpOwner.uuid === member.uuid && <FaCrown />}
                  </HStack>

                  {group.grpOwner.uuid === loggedInUser.uid &&
                    group.grpOwner.uuid !== member.uuid && (
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="remove user"
                        colorScheme="red"
                        size="xs"
                        onClick={() => removeFromGroup(group, member.uuid)}
                      />
                    )}
                </HStack>
              </HStack>
            </Center>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
