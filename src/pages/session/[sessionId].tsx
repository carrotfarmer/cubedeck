import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import DefaultErrorPage from "next/error";

const SessionPage = () => {
  const router = useRouter();
  const { sessionId } = router.query;

  // currently logged in user
  const [user, loading, error] = useAuthState(auth);
  const [doesSessionExists, setSessionExists] = useState(false);

  if (loading) {
    return <Spinner />;
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
        }
      });
    }
  );

  // User is not logged in
  if (!user.uid) {
    return <p>You must be logged in to view this page.</p>;
  }

  // Session exists
  if (doesSessionExists) {
    return <p>Great!</p>;
  }

  // Throw 404 if the session is not found
  return <DefaultErrorPage statusCode={404} />;
};

export default SessionPage;
