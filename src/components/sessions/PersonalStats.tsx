import { Box, Heading, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { collection } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase.config";
import {
  convertToMinutesAndSeconds,
  getAllSolves,
  prettify,
} from "../../utils";

interface PersonalStatsProps {
  user: User;
}

export const PersonalStats: React.FC<PersonalStatsProps> = ({ user }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sessions, loadingSessions, errorSessions] = useCollectionData(
    collection(db, user.uid)
  );

  if (loadingSessions) {
    return <Text>Loading sessions data...</Text>;
  }

  const userSolves = getAllSolves(sessions);

  const fastestSolve: {
    minutes: number;
    seconds: number;
  } = convertToMinutesAndSeconds(Math.min(...Object.values(userSolves)));

  const slowestSolve: {
    minutes: number;
    seconds: number;
  } = convertToMinutesAndSeconds(Math.max(...Object.values(userSolves)));

  const averageSolve: {
    minutes: number;
    seconds: number;
  } = convertToMinutesAndSeconds(
    Math.floor(
      userSolves.reduce((a: number, b: number) => a + b, 0) / userSolves.length
    )
  );

  return (
    <Box>
      <Box pt="3">
        <Heading fontSize="2xl">Personal Best 🏆🥇</Heading>
        <Heading
          fontSize="6xl"
          fontWeight="extrabold"
          color="green.400"
          pt="2.5"
        >
          {prettify(fastestSolve.minutes)}:{prettify(fastestSolve.seconds)}
        </Heading>
        <Heading fontSize="2xl" pt="10">
          Slowest Solve 🏃‍♂️🏃‍♀️
        </Heading>
        <Heading fontSize="6xl" fontWeight="extrabold" color="red.300" pt="2.5">
          {prettify(slowestSolve.minutes)}:{prettify(slowestSolve.seconds)}
        </Heading>
        <Heading fontSize="2xl" pt="10">
          Average ⨏
        </Heading>
        <Heading
          fontSize="6xl"
          fontWeight="extrabold"
          color="yellow.400"
          pt="2.5"
        >
          {prettify(averageSolve.minutes)}:{prettify(averageSolve.seconds)}
        </Heading>
      </Box>
    </Box>
  );
};
