import {
  Text,
  Center,
  Flex,
  Heading,
  Spinner,
  Button,
  Box,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "../../../components/utils/nav/Navbar";
import { PageHead } from "../../../components/utils/PageHead";
import { auth, db } from "../../../firebase.config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { FaPause, FaPlay } from "react-icons/fa";

const TimerPage: NextPage = () => {
  const router: NextRouter = useRouter();
  const { groupId } = router.query;

  const [user, loading] = useAuthState(auth);

  const [isActive, setIsActive] = useState<boolean>(false);

  const [time, setTime] = useState<number>(0);

  const toast = useToast();

  const handlePauseResumeStart = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatMilliseconds = (milliseconds: number) => {
    // minutes:seconds:milliseconds, make sure to 0 pad

    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsLeft = milliseconds % 1000;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${millisecondsLeft.toString().padStart(3, "0")}`;
  };

  const addSolveToSession = async (): Promise<void> => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const totalInSeconds = minutes * 60 + seconds;

    await updateDoc(doc(db, `groups/${groupId}`), {
      solves: arrayUnion({
        minutes: Number(minutes),
        seconds: Number(seconds),
        totalInSeconds,
        id: uuidv4(),
        member: {
          name: user.displayName,
          uuid: user.uid,
          profileImage: user.photoURL,
        },
      }),
    });
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((timeR) => timeR + 10);
      }, 10);
    } else if (time === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  if (loading) {
    return (
      <Center pt="25%">
        <Spinner />
      </Center>
    );
  }

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <Box>
      <PageHead title={`Cubedeck Timer`} />
      <Navbar />
      <Center pt="1%" as={Flex} flexDir="column">
        <Heading textAlign="center" pt="1%" fontSize="5xl">
          Timer
        </Heading>
        <Flex
          flexDir="column"
          mt={16}
          justifyContent="center"
          alignItems="center"
        >
          <Text fontWeight="bold" fontSize="2xl">
            {formatMilliseconds(time)}
          </Text>
          <Flex flexDir="column" experimental_spaceY={8} mt={16}>
            <Button onClick={handleReset} isDisabled={time === 0}>
              Reset
            </Button>
            <IconButton
              onClick={handlePauseResumeStart}
              autoFocus={true}
              rounded="full"
              h={48}
              w={48}
              mt={8}
              size="lg"
              icon={isActive ? <FaPause /> : <FaPlay />}
              aria-label={isActive ? "Pause" : time === 0 ? "Start" : "Resume"}
            />
            <Button
              isDisabled={!(time > 0 && !isActive)}
              colorScheme="orange"
              onClick={async () => {
                await addSolveToSession();
                setTime(0);
                toast({
                  title: "Added Solve!",
                  description: "Successfully added this solve to your session.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              Record Solve
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
};

export default TimerPage;
