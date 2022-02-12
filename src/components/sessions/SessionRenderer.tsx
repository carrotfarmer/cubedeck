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
import { prettify, sessionTagColor } from "../../utils";
import { SessionsStats } from "./SessionsStats";

interface SessionRendererProps {
  session: Session;
}

export const SessionRenderer: React.FC<SessionRendererProps> = ({
  session,
}) => {
  console.log(session.createdAt);

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
                color="orange.400"
                _hover={{ color: "orange.300" }}
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

        <Text color="gray.400">{session.sessionNotes}</Text>
        <SessionsStats session={session} />
      </Box>
    </motion.div>
  );
};
