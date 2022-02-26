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
  truncate,
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
        w={["xs", "sm"]}
        h="auto"
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

        <Text
          color="gray.500"
          pt="1"
          pb={["8%", "1.5%", "1.5%"]}
          pl="1.5"
          pr="1.5"
          textAlign="center"
        >
          {truncate(session.sessionNotes, 100)}
        </Text>
        <Box pl="2" textAlign="left" pt={["8%", "8%", "8%"]}>
          <HStack pb="2.5">
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
