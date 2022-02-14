import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  ResponsiveValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { updateDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { Session, Solve } from "../../types";
import { prettify } from "../../utils";

interface SolveRendererProps {
  solve: Solve;
  session: Session;
}

export const SolveRenderer: React.FC<SolveRendererProps> = ({
  solve,
  session,
}) => {
  const [isHovering, setIsHovering] =
    useState<ResponsiveValue<VisibilityState>>("hidden");
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();

  if (loading) {
    return <p>Loading...</p>;
  }

  const deleteSolve = async () => {
    const docRef = await updateDoc(doc(db, `${user.uid}/${session.uuid}`), {
      solves: session.solves.filter((s) => s.id !== solve.id),
    });
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.08,
      }}
    >
      <Box
        bgColor="teal.300"
        height="28"
        width="36"
        textAlign="center"
        borderRadius="xl"
        onMouseEnter={() => setIsHovering("visible")}
        onMouseLeave={() => setIsHovering("hidden")}
      >
        <Box textAlign="right">
          <IconButton
            icon={<DeleteIcon />}
            visibility={isHovering}
            color="red"
            size="xs"
            bgColor="teal.300"
            _hover={{ bgColor: "teal.200" }}
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
        </Box>
        <Text fontSize="xl" fontWeight="extrabold" pt="10%">
          {prettify(solve.minutes)}:{prettify(solve.seconds)}
        </Text>
      </Box>
    </motion.div>
  );
};
