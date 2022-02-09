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
} from "@chakra-ui/react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { Session } from "../../types";

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
      placement="right-start"
      closeOnBlur={true}
      closeOnEsc={true}
      isOpen={isOpen}
      onClose={close}
    >
      <PopoverTrigger>
        <Button
          variant="outline"
          colorScheme="orange"
          height="28"
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
            <HStack>
              <NumberInput
                defaultValue={0}
                width="20"
                onChange={handleMinutesChange}
              >
                <NumberInputField />
                <Text fontSize="xs">mins</Text>
              </NumberInput>
              <NumberInput width="20" onChange={handleSecondsChange}>
                <NumberInputField />
                <Text fontSize="xs">secs</Text>
              </NumberInput>
            </HStack>
          </FormControl>
        </PopoverBody>
        <PopoverFooter>
          <Button
            colorScheme="orange"
            onClick={() => {
              if (minutes < 60 && seconds < 60 && minutes >= 0 && seconds > 0) {
                addSolveToSession({
                  minutes,
                  seconds,
                });
                close();
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
