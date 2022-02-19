import { Box } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";

interface LeaderboardProps {
  group: DocumentData;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ group }) => {
  const bestSolves = group.solves.sort((a, b) => {
    return a.totalInSeconds - b.totalInSeconds;
  });

  return (
    <Box>
      {bestSolves.map((solve, index) => {
        return (
          <Box key={index}>
            {solve.member.name} - {solve.totalInSeconds}
          </Box>
        );
      })}
    </Box>
  );
};
