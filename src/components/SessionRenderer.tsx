import React from "react";
import { Session } from "../types";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface SessionRendererProps {
  session: Session;
}

export const SessionRenderer: React.FC<SessionRendererProps> = ({
  session,
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
    >
      <Box border="2px solid orange" borderRadius="xl" boxShadow="2xl">
        <Text fontSize="xl" fontWeight="bold" color="orange.400">
          {session.sessionTitle}
        </Text>
        <Text>{session.sessionNotes}</Text>
        <Box pr="5%">
          <Text fontSize="sm" textAlign="right" color="gray.400">
            {session.sessionType}
          </Text>
        </Box>
      </Box>
    </motion.div>
  );
};
