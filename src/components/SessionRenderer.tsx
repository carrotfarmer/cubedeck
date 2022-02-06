import React from "react";
import { Session } from "../types";
import { Box, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SessionRendererProps {
  session: Session;
}

export const SessionRenderer: React.FC<SessionRendererProps> = ({
  session,
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
      }}
    >
      <Box border="2px solid orange" borderRadius="xl" boxShadow="2xl">
        <Link href={`/session/${session.uuid}`}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="orange.400"
            _hover={{ color: "orange.300" }}
          >
            {session.sessionTitle}
          </Text>
        </Link>
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
