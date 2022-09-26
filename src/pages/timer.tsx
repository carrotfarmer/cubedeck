import {
  Text,
  Center,
  Flex,
  Heading,
  Button,
  Box,
  useToast,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Navbar } from "../components/utils/nav/Navbar";
import { PageHead } from "../components/utils/PageHead";
import { FaPause, FaPlay } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

const TimerPage: NextPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const [user, loading] = useAuthState(auth);

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
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  let toastMsg = "";
  let toastTitle = "";
  let toastType: "info" | "warning" | "success" | "error" = "info";

  user
    ? ((toastMsg = "Record solves in sessions or groups"),
      (toastTitle = "Timer"),
      (toastType = "error"))
    : ((toastMsg = "Start your cubing journey by signing up! :)"),
      (toastTitle = "Sign-in to record your solve!"),
      (toastType = "info"));

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
                toast({
                  title: toastTitle,
                  description: toastMsg,
                  status: toastType,
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
