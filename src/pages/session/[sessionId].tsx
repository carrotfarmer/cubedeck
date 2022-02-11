import { auth, db } from "../../firebase.config";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import {
  Box,
  Button,
  Center,
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
} from "@chakra-ui/react";

import { Navbar } from "../../components/Navbar";
import { Session } from "../../types";

import Head from "next/head";
import { Solves } from "../../components/solves/Solves";
import { EditSession } from "../../components/sessions/EditSession";
import { EditIcon } from "@chakra-ui/icons";
import { puzzleTypes } from "../../constants";
import { update } from "lodash";

const SessionPage = (): ReactElement<any, any> => {
  const router = useRouter();
  const { sessionId } = router.query;

  // currently logged in user
  const [user, loading, error] = useAuthState(auth);
  const [doesSessionExists, setSessionExists] = useState(false);
  const [sessionDocs, setSessionDocs] = useState<Session>({
    sessionTitle: "",
    sessionNotes: "",
    sessionType: "",
    uuid: "",
    solves: [],
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const [sessionTitle, setSessionTitle] = useState(sessionDocs.sessionTitle);
  const [sessionNotes, setSessionNotes] = useState(sessionDocs.sessionNotes);
  const [puzzleType, setPuzzleType] = useState(sessionDocs.sessionType);

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
          });
        }
      });
    }
  );

  // Session exists
  if (doesSessionExists) {
    // const sessionsRef = collection(db, user.uid);
    const docRef = doc(db, user.uid, String(sessionId));
    // console.log(sessionDocs);
    const updateSession = async (
      sessionTitle: string,
      sessionNotes: string,
      sessionType: string
    ) => {
      const ref = await setDoc(
        docRef,
        {
          sessionTitle,
          sessionNotes,
          sessionType,
        },
        { merge: true }
      );
    };

    return (
      <Box>
        <Head>
          <title>Cubedeck Session: {sessionDocs.sessionTitle}</title>
        </Head>
        <Navbar props={undefined} />
        <Center>
          <HStack>
            <Box>
              <Heading textAlign="center" pt="5%" fontSize="5xl">
                {sessionDocs.sessionTitle}
              </Heading>
            </Box>
            <Box pl="10%">
              <Popover isOpen={isOpen} onClose={close}>
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
                        <Button>Session Type</Button>
                      </MenuButton>
                      <Text fontSize="sm">
                        Current session type: {puzzleType}
                      </Text>
                      <MenuList>
                        {puzzleTypes.map((puzzleType) => (
                          <MenuItem
                            onClick={() => {
                              setPuzzleType(puzzleType);
                            }}
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
                      onClick={() => {
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
                        } else if (puzzleType !== "") {
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
          </HStack>
        </Center>
        <Box pl="3%" pt="3%" pr="3%">
          <Solves session={sessionDocs} />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        {/* 404 not found; cannot return 404 because this component is rendered even on data loading */}
        <Navbar props={undefined} />
      </Box>
    );
  }
};

export default SessionPage;
