import {
  Box,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Session, Solve } from "../../types";
import { convertToMinutesAndSeconds, prettify } from "../../utils";

interface SessionsStatsProps {
  session: Session;
}

export const SessionsStats: React.FC<SessionsStatsProps> = ({ session }) => {
  const solveTimes: number[] = [];

  session.solves.map((solve: Solve) => solveTimes.push(solve.totalInSeconds));

  const fastestSolve = Math.min(...Object.values(solveTimes));
  const fastestSolveMins = convertToMinutesAndSeconds(fastestSolve).minutes;
  const fastestSolveSecs = convertToMinutesAndSeconds(fastestSolve).seconds;

  const slowestSolve = Math.max(...Object.values(solveTimes));
  const slowestSolveMins = convertToMinutesAndSeconds(slowestSolve).minutes;
  const slowestSolveSecs = convertToMinutesAndSeconds(slowestSolve).seconds;

  const averageTime = Math.floor(
    solveTimes.reduce((a, b) => a + b, 0) / solveTimes.length
  );
  const averageTimeMins = convertToMinutesAndSeconds(averageTime).minutes;
  const averageTimeSecs = convertToMinutesAndSeconds(averageTime).seconds;

  const slowerPercentage: number = Math.abs(
    100 - Math.floor((slowestSolve / averageTime) * 100)
  );

  const fasterPercentage: number =
    100 - Math.floor((fastestSolve / averageTime) * 100);

  return (
    <Box pt="3">
      <Text fontSize="lg" fontWeight="bold" color="blue.400">
        Stats
      </Text>
      <Text>Solves: {session.solves.length}</Text>
      {session.solves.length > 0 && (
        <>
          <Stat pt="5">
            <StatLabel>Average Solve Time</StatLabel>
            <StatNumber>
              {prettify(averageTimeMins)}:{prettify(averageTimeSecs)}
            </StatNumber>
          </Stat>
          <Stat pt="5">
            <StatLabel>Fastest Solve</StatLabel>
            <StatNumber>
              {prettify(fastestSolveMins)}:{prettify(fastestSolveSecs)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {fasterPercentage}% faster than average
            </StatHelpText>
          </Stat>
          <Stat pt="5">
            <StatLabel>Slowest Solve</StatLabel>
            <StatNumber>
              {prettify(slowestSolveMins)}:{prettify(slowestSolveSecs)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              {slowerPercentage}% slower than average
            </StatHelpText>
          </Stat>
        </>
      )}
    </Box>
  );
};
