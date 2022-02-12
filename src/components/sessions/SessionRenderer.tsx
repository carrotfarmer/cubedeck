import React from "react";
import { Session } from "../../types";
import { Box, Text, Link as ChakraLink, Center } from "@chakra-ui/react";
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
        scale: 1.02,
      }}
    >
      <Box
        border="2px solid orange"
        borderRadius="lg"
        boxShadow="xl"
        boxSize="xs"
      >
        <Text pt="5">
          <Link href={`/session/${session.uuid}`}>
            <Center pr="10" pl="10">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="orange.400"
                _hover={{ color: "orange.300" }}
                as={ChakraLink}
              >
                {session.sessionTitle}
              </Text>
            </Center>
          </Link>
        </Text>

        <Text color="gray.400">{session.sessionNotes}</Text>
        <Box pr="5%">
          <Text fontSize="sm" textAlign="right" color="gray.400">
            {session.sessionType}
          </Text>
        </Box>
      </Box>
    </motion.div>
  );
};
