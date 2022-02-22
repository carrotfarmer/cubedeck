import { auth, db } from "../../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { NextRouter, useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";

import { Navbar } from "../../components/std/Navbar";
import { Session } from "../../types";

import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { puzzleTypes } from "../../constants";
import { SessionTabs } from "../../components/sessions/SessionTabs";
import { PageHead } from "../../components/utils/PageHead";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SessionPage = (): ReactElement<any, any> => {
  const router: NextRouter = useRouter();
  const { sessionId } = router.query;

  // currently logged in user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const [doesSessionExists, setSessionExists] = useState(false);
  const [sessionDocs, setSessionDocs] = useState<Session>({
    sessionTitle: "",
    sessionNotes: "",
    sessionType: "",
    uuid: "",
    solves: [],
    createdAt: serverTimestamp(),
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const [sessionTitle, setSessionTitle] = useState(sessionDocs.sessionTitle);
  const [sessionNotes, setSessionNotes] = useState(sessionDocs.sessionNotes);
  const [puzzleType, setPuzzleType] = useState(sessionDocs.sessionType);

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const onClose = () => setIsAlertOpen(false);
  const cancelRef: React.MutableRefObject<undefined> = React.useRef();

  const initialFocusRef = React.useRef();

  const toast = useToast();

  // fetching user data
  if (loading) {
    return (
      <Center pt="25%">
        <Spinner />
      </Center>
    );
  }

  // User is not logged in
  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  // get session data from firestore
  const userCollection = collection(db, user.uid);
  const sessionDocQuery = query(userCollection, where("uuid", "==", sessionId));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _sessionDocs: Promise<void> = getDocs(sessionDocQuery).then(
    (sessionDocs: QuerySnapshot<DocumentData>) => {
      const data = sessionDocs.docs;
      data.map((docs: QueryDocumentSnapshot<DocumentData>) => {
        const sessionDocData: DocumentData = docs.data();
        if (typeof sessionDocData.sessionTitle !== "undefined") {
          setSessionExists(true);
          setSessionDocs({
            sessionTitle: sessionDocData.sessionTitle,
            sessionNotes: sessionDocData.sessionNotes,
            sessionType: sessionDocData.sessionType,
            uuid: sessionDocData.uuid,
            solves: sessionDocData.solves,
            createdAt: sessionDocData.createdAt,
          });
        }
      });
    }
  );

  // Session exists
  if (doesSessionExists) {
    // const sessionsRef = collection(db, user.uid);
    const docRef: DocumentReference<DocumentData> = doc(
      db,
      user.uid,
      String(sessionId)
    );
    const updateSession = async (
      sessionTitle: string,
      sessionNotes: string,
      sessionType: string
    ): Promise<void> => {
      await setDoc(
        docRef,
        {
          sessionTitle,
          sessionNotes,
          sessionType,
        },
        { merge: true }
      );
    };

    const deleteSession = async (): Promise<void> => {
      await deleteDoc(doc(db, user.uid, String(sessionId)));
    };

    return (
      <Box>
        <PageHead title={`Cubedeck Session: ${sessionDocs.sessionTitle}`} />
        <Navbar />
        <Center pt="1%">
          <HStack>
            <Box>
              <Popover
                isOpen={isOpen}
                onClose={close}
                initialFocusRef={initialFocusRef}
              >
                <PopoverTrigger>
                  <Button colorScheme="orange" size="xs" onClick={open}>
                    <Box pr="1">
                      <EditIcon />
                    </Box>
                    Edit
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight="bold">Edit Session</PopoverHeader>
                  <PopoverBody>
                    <FormControl>
                      <FormLabel>Session Name</FormLabel>
                      <Input
                        placeholder={sessionDocs.sessionTitle}
                        onChange={(e) => setSessionTitle(e.currentTarget.value)}
                        ref={initialFocusRef}
                      />
                    </FormControl>
                    <FormControl pt="5">
                      <FormLabel>Session Notes</FormLabel>
                      <Input
                        placeholder={sessionDocs.sessionNotes}
                        onChange={(e) => setSessionNotes(e.currentTarget.value)}
                      />
                    </FormControl>
                    <Menu>
                      <MenuButton pt="5%">
                        <Button>
                          Session Type
                          <ChevronDownIcon />
                        </Button>
                      </MenuButton>
                      <Text fontSize="sm" pt="1">
                        Current session type: {sessionDocs.sessionType}
                      </Text>
                      <MenuList>
                        {puzzleTypes.map((puzzleType) => (
                          <MenuItem
                            onClick={() => {
                              setPuzzleType(puzzleType);
                            }}
                            key={puzzleType}
                          >
                            {puzzleType}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </PopoverBody>
                  <PopoverFooter>
                    <Button
                      colorScheme="orange"
                      mr="2"
                      onClick={(): void => {
                        if (sessionTitle !== "") {
                          updateSession(
                            sessionTitle,
                            sessionDocs.sessionNotes,
                            sessionDocs.sessionType
                          );
                          close();
                        } else if (sessionNotes !== "") {
                          updateSession(
                            sessionDocs.sessionTitle,
                            sessionNotes,
                            sessionDocs.sessionType
                          );
                          close();
                        } else if (puzzleType !== sessionDocs.sessionType) {
                          updateSession(
                            sessionDocs.sessionTitle,
                            sessionDocs.sessionNotes,
                            puzzleType
                          );
                          close();
                        } else {
                          updateSession(
                            sessionDocs.sessionTitle,
                            sessionDocs.sessionNotes,
                            sessionDocs.sessionType
                          );
                          close();
                        }
                      }}
                    >
                      Save
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </Box>
            <Box>
              <Button
                colorScheme="red"
                size="xs"
                onClick={() => setIsAlertOpen(true)}
              >
                <Box pr="1">
                  <DeleteIcon />
                </Box>
                Delete
              </Button>
              <>
                <AlertDialog
                  isOpen={isAlertOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Session
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? This action cannot be undone.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            deleteSession();
                            onClose();
                            Router.push("/");
                            toast({
                              title: "Session deleted.",
                              description: "Session deleted successfully.",
                              status: "success",
                              duration: 5000,
                              isClosable: true,
                            });
                          }}
                          ml={3}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </>
            </Box>
          </HStack>
        </Center>
        <Center>
          <Heading textAlign="center" pt="1%" fontSize="5xl">
            {sessionDocs.sessionTitle}
          </Heading>
        </Center>
        <Center pl="16" pr="16">
          <Text color="gray.400">{sessionDocs.sessionNotes}</Text>
        </Center>
        <Divider pt="5" />
        <Box pl="3%" pt="3%" pr="3%">
          <SessionTabs session={sessionDocs} />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        {/* 404 not found; cannot return 404 because this component is rendered even on data loading */}
        <Navbar />
      </Box>
    );
  }
};

export default SessionPage;
