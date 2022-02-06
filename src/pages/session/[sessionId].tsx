import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import DefaultErrorPage from "next/error";
import { Navbar } from "../../components/Navbar";
import { Session } from "../../types";
import { Subheading } from "../../constants";
import "@fontsource/fjalla-one";

const SessionPage = () => {
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
  });

  // fetching user data
  if (loading) {
    return <Spinner />;
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
      data.map((dataOne) => {
        const sessionDocData = dataOne.data();
        if (typeof sessionDocData.sessionTitle !== "undefined") {
          setSessionExists(true);
          setSessionDocs({
            sessionTitle: sessionDocData.sessionTitle,
            sessionNotes: sessionDocData.sessionNotes,
            sessionType: sessionDocData.sessionType,
            uuid: sessionDocData.uuid,
          });
        }
      });
    }
  );

  // Session exists
  if (doesSessionExists) {
    return (
      <Box>
        <Navbar props={undefined} />
        <Text fontSize="3xl" fontWeight="bold" style={Subheading}>
          {sessionDocs.sessionTitle}
        </Text>
      </Box>
    );
  }

  // Throw 404 if the session is not found
  return (
    <>
      <Navbar props={undefined} />
      <DefaultErrorPage statusCode={404} />
    </>
  );

  return null;
};

export default SessionPage;
