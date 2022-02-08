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
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateSolveProps {
  session: Session;
}

export const CreateSolve: React.FC<CreateSolveProps> = ({ session }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef: React.MutableRefObject<undefined> = React.useRef();
  const finalRef: React.MutableRefObject<undefined> = React.useRef();

  // get logged in user
  const [user, loading, error] = useAuthState(auth);

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

  const addSolveToSession = async () => {
    await updateDoc(doc(db, `${user.uid}/${session.uuid}`), {
      solves: arrayUnion({
        minutes: Number(minutes),
        seconds: Number(seconds),
        totalInSeconds: Number(minutes * 60) + Number(seconds),
        id: uuidv4(),
      }),
    });
  };

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
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
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
                  height="10"
                  value={minutes}
                  onChange={handleMinutesChange}
                >
                  <NumberInputField />
                </NumberInput>{" "}
                <Text fontSize="xs">mins</Text>
                <NumberInput
                  ref={initialRef}
                  size="md"
                  onChange={handleSecondsChange}
                >
                  <NumberInputField />
                </NumberInput>
                <Text fontSize="xs">secs</Text>
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={() => {
                addSolveToSession();
                onClose();
              }}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
