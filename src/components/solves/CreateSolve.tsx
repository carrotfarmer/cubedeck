import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Session } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Router from "next/router";
interface CreateSolveProps {
  session: Session;
}

interface AddSolveToSessionParams {
  minutes: number;
  seconds: number;
}

export const CreateSolve: React.FC<CreateSolveProps> = ({ session }) => {
  const [user, loading, error] = useAuthState(auth);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const addSolveToSession = async (solve: AddSolveToSessionParams) => {
    const docRef = await updateDoc(doc(db, `${user.uid}/${session.uuid}`), {
      solves: arrayUnion({
        minutes: Number(solve.minutes),
        seconds: Number(solve.seconds),
        totalInSeconds: Number(solve.minutes * 60) + Number(solve.seconds),
        id: uuidv4(),
      }),
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const [minutes, setMinutes] = useState<number>(0);
  const handleMinutesChange = (value) => {
    setMinutes(value);
  };

  const [seconds, setSeconds] = useState<number>(0);
  const handleSecondsChange = (value) => {
    setSeconds(value);
  };

  const [submitting, setSubmitting] = useState(false);

  return (
    <Box>
      <Button
        variant="outline"
        colorScheme="orange"
        height="28"
        onClick={onOpen}
      >
        New Solve
      </Button>
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        size="2xl"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Solve</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Solve Time</FormLabel>
              <Stack shouldWrapChildren direction="row">
                <NumberInput
                  size="md"
                  defaultValue="0"
                  value={minutes}
                  onChange={handleMinutesChange}
                >
                  <NumberInputField />
                </NumberInput>{" "}
                <Text fontSize="xs">mins</Text>
                <NumberInput size="md" onChange={handleSecondsChange}>
                  <NumberInputField />
                </NumberInput>
                <Text fontSize="xs">secs</Text>
              </Stack>
              <Text fontSize="xs" pt="5%">
                After adding, please wait for a few moments for your data to get
                updated.
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              isLoading={submitting}
              onClick={() => {
                if (
                  minutes < 60 &&
                  seconds < 60 &&
                  minutes >= 0 &&
                  seconds > 0
                ) {
                  setSubmitting(true);
                  addSolveToSession({
                    minutes,
                    seconds,
                  }).then(() => {
                    // onClose();
                    Router.reload();
                  });
                } else {
                  alert("Invalid input");
                }
              }}
            >
              Add Solve
            </Button>
            <Button
              onClick={() => {
                onClose();
                Router.reload();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
