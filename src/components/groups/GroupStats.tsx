import { Box, Center, Heading, Tooltip } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { Member, Solve } from "../../types";
import { convertToMinutesAndSeconds, prettify } from "../../utils";

interface GroupStatsProps {
  group: DocumentData;
}

export const GroupStats: React.FC<GroupStatsProps> = ({ group }) => {
  const averageSolve = convertToMinutesAndSeconds(
    Math.round(
      group.solves.reduce((acc, curr) => acc + curr.totalInSeconds, 0) /
        group.solves.length
    )
  );

  const getSolvesOfAMember = (member: Member) => {
    return group.solves.filter((solve) => solve.member.uuid === member.uuid);
  };

  const mostSolves: {
    member: Member;
    solves: Solve[];
  } = group.grpMembers.reduce(
    (acc, curr: Member) => {
      const solves = getSolvesOfAMember(curr);
      if (solves.length > acc.solves.length) {
        return {
          member: curr,
          solves,
        };
      }
      return acc;
    },
    { member: group.grpMembers[0], solves: [] }
  );

  const bestSolver: {
    member: Member;
    averageTime: number;
  } = group.grpMembers.reduce(
    (acc, curr: Member) => {
      const solves = getSolvesOfAMember(curr);
      const totalTime = solves.reduce(
        (acc, curr) => acc + curr.totalInSeconds,
        0
      );
      const averageTime = Math.round(totalTime / solves.length);
      if (averageTime < acc.averageTime) {
        return {
          member: curr,
          averageTime,
        };
      }
      return acc;
    },
    { member: group.grpMembers[0], averageTime: Infinity }
  );

  // return fastest solve and the person with that solve time
  const fastestSolve: {
    member: Member;
    solve: Solve;
  } = group.grpMembers.reduce(
    (acc, curr: Member) => {
      const solves = getSolvesOfAMember(curr);
      const fastestSolve = solves.reduce((acc, curr) => {
        if (curr.totalInSeconds < acc.totalInSeconds) {
          return curr;
        }
        return acc;
      }, solves[0]);
      if (fastestSolve.totalInSeconds < acc.solve.totalInSeconds) {
        return {
          member: curr,
          solve: fastestSolve,
        };
      }
      return acc;
    },
    { member: group.grpMembers[0], solve: group.solves[0] }
  );

  const convertedBestSolver: {
    minutes: number;
    seconds: number;
  } = convertToMinutesAndSeconds(bestSolver.averageTime);

  return (
    <Box>
      <Center>
        <Heading fontSize="2xl" fontWeight="extrabold">
          Group Average
        </Heading>
      </Center>
      <Center>
        <Heading fontSize="4xl" fontWeight="extrabold" color="yellow.400">
          {prettify(averageSolve.minutes)}:{prettify(averageSolve.seconds)}
        </Heading>
      </Center>
      <Center pt="5">
        <Heading fontSize="2xl" fontWeight="extrabold">
          Highest Contributor
        </Heading>
      </Center>
      <Center>
        <Heading fontSize="4xl" color="green.400">
          {mostSolves.member.name} ({mostSolves.solves.length} solves)
        </Heading>
      </Center>
      <Center pt="5">
        <Heading fontSize="2xl">
          <Tooltip
            label="Member with best average solve time"
            aria-label="tooltip"
          >
            Fastest Solver (avg)
          </Tooltip>
        </Heading>
      </Center>
      <Center color="blue.300">
        <Heading>
          {bestSolver.member.name} - {prettify(convertedBestSolver.minutes)}:
          {prettify(convertedBestSolver.seconds)}
        </Heading>
      </Center>
      <Center pt="5">
        <Heading fontSize="2xl">Fastest Solve</Heading>
      </Center>
      <Center color="blue.300">
        <Heading>
          {prettify(fastestSolve.solve.minutes)}:
          {prettify(fastestSolve.solve.seconds)} - {fastestSolve.member.name}
        </Heading>
      </Center>
    </Box>
  );
};
