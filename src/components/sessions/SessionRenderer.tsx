import React from "react";
import { Session } from "../../types";
import { Box, Text, Link as ChakraLink, Center, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sessionTagColor } from "../../utils";

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
        borderWidth="thin"
        borderColor="cyan.300"
        borderRadius="md"
        boxShadow="xl"
        boxSize="2xs"
        w={["xs", "md", "md"]}
        h={["250", "150", "150"]}
      >
        <Text pt="5">
          <Link href={`/session/${session.uuid}`} passHref>
            <Center pr="10" pl="10">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="blue.300"
                _hover={{ color: "blue.400" }}
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
        </Text>

        <Text color="gray.500" pt="1">
          {session.sessionNotes}
        </Text>
      </Box>
    </motion.div>
  );
};
