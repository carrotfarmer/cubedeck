import {
  Button,
  FormControl,
  HStack,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { Session } from "../../types";
import { FocusLock } from "@chakra-ui/focus-lock";

interface NewSolveProps {
  session: Session;
}

export const NewSolve: React.FC<NewSolveProps> = ({ session }) => {
  const [minutes, setMinutes] = useState(0);
  const handleMinutesChange = (value) => {
    setMinutes(value);
  };
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const toast = useToast();

  const addSolveToSession = async (solve: {
    minutes: number;
    seconds: number;
  }): Promise<void> => {
    const docRef = await updateDoc(doc(db, `${user.uid}/${session.uuid}`), {
      solves: arrayUnion({
        minutes: Number(solve.minutes),
        seconds: Number(solve.seconds),
        totalInSeconds: Number(solve.minutes * 60) + Number(solve.seconds),
        id: uuidv4(),
      }),
    });
  };

  const [seconds, setSeconds] = useState(0);
  const handleSecondsChange = (value) => {
    setSeconds(value);
  };

  return (
    <Popover
      placement="top-start"
      closeOnBlur={true}
      closeOnEsc={true}
      isOpen={isOpen}
      onClose={close}
    >
      <PopoverTrigger>
        <Button
          variant="outline"
          colorScheme="teal"
          height="28"
          width="36"
          onClick={open}
        >
          New Solve
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Add Solve</PopoverHeader>
        <PopoverBody>
          <FormControl>
            <FocusLock>
              <HStack>
                <NumberInput
                  width="20"
                  onChange={handleMinutesChange}
                  value={minutes}
                >
                  <NumberInputField />
                  <Text fontSize="xs">mins</Text>
                </NumberInput>
                <NumberInput
                  width="20"
                  onChange={handleSecondsChange}
                  value={seconds}
                >
                  <NumberInputField />
                  <Text fontSize="xs">secs</Text>
                </NumberInput>
              </HStack>
            </FocusLock>
          </FormControl>
        </PopoverBody>
        <PopoverFooter>
          <Button
            colorScheme="teal"
            onClick={() => {
              if (minutes < 60 && seconds < 60 && minutes >= 0 && seconds > 0) {
                addSolveToSession({
                  minutes,
                  seconds,
                });
                setSeconds(0);
                setMinutes(0);
                close();
                toast({
                  title: "Added Solve!",
                  description: "Successfuly added this solve to your session.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              } else {
                alert("Bruh.");
              }
            }}
          >
            Add
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
