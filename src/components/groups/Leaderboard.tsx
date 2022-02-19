import {
  Avatar,
  Box,
  HStack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { ImTrophy } from "react-icons/im";
import { GroupSolve } from "../../types";
import { prettify } from "../../utils";

interface LeaderboardProps {
  group: DocumentData;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ group }) => {
  const bestSolves: GroupSolve[] = group.solves.slice(0, 5).sort((a, b) => {
    return a.totalInSeconds - b.totalInSeconds;
  });

  const topThree: GroupSolve[] = bestSolves.slice(0, 3);
  const remaining: GroupSolve[] = bestSolves.slice(3);

  return (
    <Box>
      <Table
        variant="simple"
        colorScheme={group.grpColor.colorVal.split(".")[0]}
      >
        <TableCaption fontSize="xl">
          Top 10 solves for {group.grpName}
        </TableCaption>
        <Thead>
          <Tr>
            <Th fontSize="md">Solve Time</Th>
            <Th fontSize="md">By</Th>
          </Tr>
        </Thead>
        <Tbody>
          {topThree.map((solve: GroupSolve) => {
            return (
              <Tr key={solve.id}>
                <Td>
                  {prettify(solve.minutes)}:{prettify(solve.seconds)}
                </Td>
                <Td>
                  <HStack>
                    <Avatar size="sm" src={solve.member.profileImage} />
                    <Text>{solve.member.name}</Text>
                    <ImTrophy color="orange" />
                  </HStack>
                </Td>
              </Tr>
            );
          })}
          {remaining.map((solve: GroupSolve) => {
            return (
              <Tr key={solve.id}>
                <Td>
                  {prettify(solve.minutes)}:{prettify(solve.seconds)}
                </Td>
                <Td>
                  <HStack>
                    <Avatar
                      src={solve.member.profileImage}
                      size="xs"
                      key={solve.member.uuid}
                    />
                    <Text key={solve.member.uuid}>{solve.member.name}</Text>
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
