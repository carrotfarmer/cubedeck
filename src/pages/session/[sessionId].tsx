import { auth, db } from "../../firebase.config";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { Alert, AlertIcon, Box, Spinner, Text } from "@chakra-ui/react";

// Default 404 page
import DefaultErrorPage from "next/error";

import { Navbar } from "../../components/Navbar";
import { Session } from "../../types";

// Apply subheading font
import { Subheading } from "../../constants";

// Subheading font
import "@fontsource/fjalla-one";
import Head from "next/head";

// display all solves
import { Solves } from "../../components/solves/Solves";

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

  // fetching user data
  if (loading) {
    return (
      <Alert status="info">
        <AlertIcon />
        Loading session data...
        <Spinner />
      </Alert>
    );
  }

  // User is not logged in
  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  // get session data from firestore
  const userCollection = collection(db, user.uid);
  const sessionDocQuery = query(userCollection, where("uuid", "==", sessionId));
  const _sessionDocs = getDocs(sessionDocQuery).then(
    (sessionDocs: QuerySnapshot<DocumentData>) => {
      const data = sessionDocs.docs;
      data.map((docs: QueryDocumentSnapshot<DocumentData>) => {
        const sessionDocData = docs.data();
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
    return (
      <Box>
        <Head>
          <title>Cubedeck Session: {sessionDocs.sessionTitle}</title>
        </Head>
        <Navbar props={undefined} />
        <Text
          fontSize="3xl"
          fontWeight="bold"
          style={Subheading}
          textAlign="center"
          pt="5%"
        >
          {sessionDocs.sessionTitle}
        </Text>
        <Solves session={sessionDocs} />
      </Box>
    );
  }

  // Throw 404 if the session is not found
  return (
    <React.Fragment>
      <Navbar props={undefined} />
      <DefaultErrorPage statusCode={404} />
    </React.Fragment>
  );
};

export default SessionPage;
