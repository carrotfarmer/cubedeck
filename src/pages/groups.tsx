import {
  Box,
  Center,
  Divider,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { collection, orderBy, query } from "firebase/firestore";
import type { NextPage } from "next";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CreateGroup } from "../components/groups/CreateGroup";
import { GroupRenderer } from "../components/groups/GroupRenderer";
import { JoinGroup } from "../components/groups/JoinGroup";
import { Footer } from "../components/std/Footer";
import { Navbar } from "../components/std/Navbar";
import { PageHead } from "../components/utils/PageHead";
import { auth, db } from "../firebase.config";
import { Group, Member } from "../types";

const Groups: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groupsData, loadingGroupsData, errorGroupsData] = useCollectionData(
    query(collection(db, "groups"), orderBy("grpName", "asc"))
  );

  if (loading || loadingGroupsData) {
    return (
      <React.Fragment>
        <PageHead title="Cubedeck | Loading" />
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
      <PageHead title={`Cubedeck | ${user.displayName}`} />
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
      <SimpleGrid columns={[1, 3, 3]} spacing="6" pr="5" pl="5" pt="5" pb="10">
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
      <Footer />
    </Box>
  );
};

export default Groups;
