import {
  Box,
  Center,
  Divider,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CreateGroup } from "../components/groups/CreateGroup";
import { GroupRenderer } from "../components/groups/GroupRenderer";
import { JoinGroup } from "../components/groups/JoinGroup";
import { Navbar } from "../components/std/Navbar";
import { auth, db } from "../firebase.config";
import { Group, Member } from "../types";

const Groups: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [groupsData, loadingGroupsData, errorGroupsData] = useCollectionData(
    collection(db, "groups")
  );

  if (loading || loadingGroupsData) {
    return (
      <React.Fragment>
        <Head>
          <title>Cubedeck | Loading</title>
        </Head>
        <Center>Loading...</Center>
      </React.Fragment>
    );
  }

  if (!user) {
    return <p>You must be logged in to view this page!</p>;
  }

  return (
    <Box>
      {/* set page title to groups / user name */}
      <Head>
        <title>Groups | {user.displayName}</title>
      </Head>
      <Navbar />
      <Heading fontSize="4xl" textAlign="center" pt="5">
        Groups
      </Heading>
      <Center>
        <HStack>
          <CreateGroup />
          <JoinGroup />
        </HStack>
      </Center>
      <Divider pt="5" />
      <SimpleGrid columns={[1, 3, 3]} spacing="6" pr="5" pl="5" pt="5">
        {groupsData.map((group: Group) =>
          group.grpMembers.map((member: Member) =>
            member.uuid === user.uid ? (
              <GridItem>
                <GroupRenderer group={group} />
              </GridItem>
            ) : (
              <></>
            )
          )
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Groups;
