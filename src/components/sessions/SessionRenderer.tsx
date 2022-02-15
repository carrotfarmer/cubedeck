import React from "react";
import { Session, Solve } from "../../types";
import {
  Box,
  Text,
  Link as ChakraLink,
  Center,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sessionTagColor } from "../../utils";
import { SessionsStats } from "./SessionsStats";

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
        border="2px solid #a67b24"
        borderRadius="lg"
        boxShadow="xl"
        boxSize="md"
        w={[300, 400, 400]}
        h={[550, 500, 500]}
      >
        <Text pt="5">
          <Link href={`/session/${session.uuid}`}>
            <Center pr="10" pl="10">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="yellow.500"
                _hover={{ color: "yellow.700" }}
                as={ChakraLink}
              >
                {session.sessionTitle}
              </Text>
              <Box pl="2">
                <Badge colorScheme={sessionTagColor(session.sessionType)}>
                  {session.sessionType}
                </Badge>
              </Box>
            </Center>
          </Link>
          <Divider pt="1" pb="1" />
        </Text>

        <Text color="gray.500" pt="1">
          {session.sessionNotes}
        </Text>
        <SessionsStats session={session} />
      </Box>
    </motion.div>
  );
};
