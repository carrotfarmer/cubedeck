import React from "react";
import { Session, Solve } from "../../types";
import {
  Box,
  Text,
  Link as ChakraLink,
  Center,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  convertToMinutesAndSeconds,
  prettify,
  sessionTagColor,
} from "../../utils";

interface SessionRendererProps {
  session: Session;
}

export const SessionRenderer: React.FC<SessionRendererProps> = ({
  session,
}) => {
  const solveTimes: number[] = [];

  session.solves.map((solve: Solve) => solveTimes.push(solve.totalInSeconds));

  const fastestSolve = convertToMinutesAndSeconds(
    Math.min(...Object.values(solveTimes))
  );

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
        boxShadow="md"
        boxSize="2xs"
        w={["xs", "md", "md"]}
        h={["180", "150", "150"]}
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
            </Center>
          </Link>
        </Text>

        <Text color="gray.500" pt="1" pb={["8%", "2%", "2%"]}>
          {session.sessionNotes}
        </Text>
        <Box pl="2" textAlign="left" pt={["8%", "8%", "8%"]}>
          <HStack>
            <Badge colorScheme={sessionTagColor(session.sessionType)}>
              {session.sessionType}
            </Badge>
            <Badge colorScheme={"orange"}>{session.solves.length} Solves</Badge>

            {session.solves.length !== 0 && (
              <Badge colorScheme={"green"}>
                Fastest solve - {prettify(fastestSolve.minutes)}:
                {prettify(fastestSolve.seconds)}
              </Badge>
            )}
          </HStack>
        </Box>
      </Box>
    </motion.div>
  );
};
