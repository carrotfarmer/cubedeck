import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
  Box,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Text,
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { puzzleTypes } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import { Session } from "../../types";

interface CreateSessionProps {}

export const CreateSession: React.FC<CreateSessionProps> = ({}) => {
  // get logged in user
  const [user, loading, error] = useAuthState(auth);

  // modal stuff
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // helper function to add the session to firestore
  const addSessionToFirestore = async (session: Session): Promise<void> => {
    const docRef = await setDoc(doc(db, `${user.uid}/${session.uuid}`), {
      sessionTitle: session.sessionTitle,
      sessionNotes: session.sessionNotes,
      sessionType: session.sessionType,
      uuid: session.uuid,
      solves: session.solves,
    });
  };

  // initial state for the session title and session note
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionNote, setSessionNote] = useState("");

  // default puzzle type
  let puzzleType: string = "3x3";

  const onPuzzleTypeChange = (newType: string): string =>
    (puzzleType = newType);

  return (
    <Box pt="2%">
      <Button onClick={onOpen} colorScheme="orange">
        Create a Session
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your session</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Session Title</FormLabel>
              <Input
                ref={initialRef}
                id="sessionTitle"
                placeholder="Eg: School contest practice #1"
                onChange={(event) => setSessionTitle(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl pt="4%">
              <FormLabel>Session Notes</FormLabel>
              <Input
                ref={finalRef}
                placeholder="My awesome session...."
                onChange={(event) => setSessionNote(event.currentTarget.value)}
              />
            </FormControl>

            <Menu>
              <Box pt="4%">
                <MenuButton rightIcon={<ChevronDownIcon />} as={Button}>
                  Session Type
                </MenuButton>
                <Text fontSize="smaller" pt="2.5">
                  Default: 3x3
                </Text>
              </Box>
              <MenuList>
                {puzzleTypes.map((puzzleType: string) => (
                  <MenuItem onClick={() => onPuzzleTypeChange(puzzleType)}>
                    {puzzleType}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={() => {
                if (sessionTitle !== "") {
                  addSessionToFirestore({
                    sessionTitle,
                    sessionNotes: sessionNote,
                    sessionType: puzzleType,
                    uuid: uuidv4(),
                    solves: [],
                  });
                  setSessionTitle("");
                  setSessionNote("");
                  puzzleType = "";
                  onClose();
                } else {
                  alert("Please enter a session title");
                }
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
