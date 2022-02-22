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
  useToast,
} from "@chakra-ui/react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { DEFAULT_PUZZLE_TYPE, puzzleTypes } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import { Solve } from "../../types";
import Router from "next/router";

interface CreateSessionProps {}

export const CreateSession: React.FC<CreateSessionProps> = ({}) => {
  // get logged in user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading, error] = useAuthState(auth);

  // modal stuff
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // helper function to add the session to firestore
  const addSessionToFirestore = async (session: {
    sessionTitle: string;
    sessionNotes: string;
    sessionType: string;
    uuid: string;
    solves: Solve[];
  }): Promise<void> => {
    await setDoc(doc(db, `${user.uid}/${session.uuid}`), {
      sessionTitle: session.sessionTitle,
      sessionNotes: session.sessionNotes,
      sessionType: session.sessionType,
      uuid: session.uuid,
      solves: session.solves,
      createdAt: serverTimestamp(),
    });
  };

  // initial state for the session title and session note
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionNote, setSessionNote] = useState("");

  const toast = useToast();

  // default puzzle type
  let puzzleType: string = DEFAULT_PUZZLE_TYPE;

  const onPuzzleTypeChange = (newType: string): string =>
    (puzzleType = newType);

  const uuid: string = uuidv4();

  return (
    <Box pt="2%">
      <Button onClick={onOpen} colorScheme="yellow">
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
            <FormControl pt="4%" isRequired>
              <FormLabel>Session Notes/Description</FormLabel>
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
                  <MenuItem
                    onClick={() => onPuzzleTypeChange(puzzleType)}
                    key={puzzleType}
                  >
                    {puzzleType}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={() => {
                if (sessionTitle !== "" && sessionNote !== "") {
                  addSessionToFirestore({
                    sessionTitle,
                    sessionNotes: sessionNote,
                    sessionType: puzzleType,
                    uuid,
                    solves: [],
                  });
                  setSessionTitle("");
                  setSessionNote("");
                  puzzleType = "";
                  toast({
                    title: "Session Created",
                    description: "Session created successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  onClose();
                  Router.push(`/session/${uuid}`);
                } else {
                  toast({
                    title: "Session Title/Notes Required",
                    description: "Please fill in all the missing fields",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
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
