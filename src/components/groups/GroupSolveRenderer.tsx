import { DeleteIcon } from "@chakra-ui/icons";
import {
  ResponsiveValue,
  useToast,
  Box,
  IconButton,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { updateDoc, doc, DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { GroupColor, GroupSolve } from "../../types";
import { prettify } from "../../utils";

interface GroupSolveRendererProps {
  solve: GroupSolve;
  groupColor: GroupColor;
  group: DocumentData;
}

export const GroupSolveRenderer: React.FC<GroupSolveRendererProps> = ({
  solve,
  groupColor,
  group,
}) => {
  const [isHovering, setIsHovering] =
    useState<ResponsiveValue<VisibilityState>>("hidden");
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();

  if (loading) {
    return <p>Loading...</p>;
  }

  const deleteSolve = async () => {
    const docRef = await updateDoc(doc(db, `groups/${group.grpId}`), {
      solves: group.solves.filter((s) => s.id !== solve.id),
    });
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.08,
      }}
    >
      <Box
        bgColor={groupColor.colorVal}
        color="black"
        height="28"
        width="36"
        textAlign="center"
        borderRadius="xl"
        onMouseEnter={() => setIsHovering("visible")}
        onMouseLeave={() => setIsHovering("hidden")}
      >
        <Box textAlign="right">
          {(user.uid === solve.member.uuid ||
            user.uid === group.grpOwner.uuid) && (
            <IconButton
              icon={<DeleteIcon />}
              visibility={isHovering}
              color="red"
              size="xs"
              bgColor={`${groupColor.colorVal.split(".")[0]}.100`}
              _hover={{ bgColor: `${groupColor.colorVal.split(".")[0]}.200` }}
              onClick={() => {
                deleteSolve();
                toast({
                  title: "Solve Deleted",
                  description: "Successfully deleted the solve",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                });
              }}
              aria-label="delete solve"
            />
          )}
        </Box>
        <Text fontSize="xl" fontWeight="extrabold" pt="10%">
          {prettify(solve.minutes)}:{prettify(solve.seconds)}
        </Text>
        <Box pt="2.5">
          <Avatar
            size="xs"
            // align to the left
            ml="-70%"
            name={solve.member.name}
            src={solve.member.profileImage}
          />
        </Box>
      </Box>
    </motion.div>
  );
};
