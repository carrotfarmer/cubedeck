import FocusLock from "@chakra-ui/focus-lock";
import {
  useToast,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormControl,
  HStack,
  NumberInput,
  NumberInputField,
  PopoverFooter,
  Text,
} from "@chakra-ui/react";
import { arrayUnion, doc, DocumentData, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";

interface NewSolveProps {
  group: DocumentData;
}

export const NewSolve: React.FC<NewSolveProps> = ({ group }) => {
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
    const docRef = await updateDoc(doc(db, `groups/${group.grpId}`), {
      solves: arrayUnion({
        minutes: Number(solve.minutes),
        seconds: Number(solve.seconds),
        totalInSeconds: Number(solve.minutes * 60) + Number(solve.seconds),
        id: uuidv4(),
        member: {
          name: user.displayName,
          uuid: user.uid,
          profileImage: user.photoURL,
        },
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
          colorScheme={group.grpColor.colorVal.split(".")[0]}
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
            colorScheme={group.grpColor.colorVal.split(".")[0]}
            onClick={() => {
              if (
                Number(minutes * 60) + Number(seconds) > 0 &&
                Number(minutes) + Number(seconds) < 3600 &&
                Number(minutes) < 60 &&
                Number(seconds) < 60
              ) {
                addSolveToSession({
                  minutes,
                  seconds,
                });
                setSeconds(0);
                setMinutes(0);
                close();
                toast({
                  title: "Added Solve!",
                  description:
                    "Successfully added this solve to the group board.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: "Yoo you tryna scam your friends? 💀",
                  description: "Please enter a valid solve.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
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
