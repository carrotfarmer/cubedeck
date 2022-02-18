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
  Text,
  toast,
  useToast,
} from "@chakra-ui/react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import type { NextPage } from "next";
import Router, { type NextRouter, useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase.config";
import { getGroupById, isUserInGroup } from "../../utils";
import DefaultErrorPage from "next/error";
import { Navbar } from "../../components/std/Navbar";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Head from "next/head";
import { puzzleTypes } from "../../constants";

const GroupPage: NextPage = () => {
  const router: NextRouter = useRouter();
  const { groupId } = router.query;
  const [groupsData, loadingGroupsData, errorGroupsData] = useCollectionData(
    collection(db, "groups")
  );
  const [user, loading, error] = useAuthState(auth);

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const onClose = () => setIsAlertOpen(false);
  const cancelRef: React.MutableRefObject<undefined> = React.useRef();

  const toast = useToast();

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const [grpName, setGrpName] = useState<string>("");

  if (loadingGroupsData || loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>You must be logged in to view this page!</p>;
  }

  const group = getGroupById(groupId, groupsData);

  const deleteGroup = async (): Promise<void> => {
    const _ref = await deleteDoc(doc(db, "groups", String(groupId)));
  };

  // group found
  if (group) {
    const isUserInGrp: boolean = isUserInGroup(user.uid, group);
    if (isUserInGrp) {
      return (
        <Box>
          <Head>
            <title>{group.grpName} | Cubedeck</title>
          </Head>
          <Navbar />

          {/* Edit Group */}
          {/* Do this only if the user is the group owner */}
          {user.uid === group.grpOwner.uuid && (
            <Center pt="5">
              <HStack>
                <Box>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        colorScheme="orange"
                        size="xs"
                        onClick={() => console.log("bruh")}
                      >
                        <Box pr="1">
                          <EditIcon />
                        </Box>
                        Edit
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader fontWeight="bold">
                        Edit Session
                      </PopoverHeader>
                      <PopoverBody>
                        <FormControl>
                          <FormLabel>Group Name</FormLabel>
                          <Input
                            placeholder={group.grpName}
                            onChange={(e) => setGrpName(e.currentTarget.value)}
                          />
                        </FormControl>
                        <FormControl pt="5">
                          <FormLabel>Group Bio</FormLabel>
                          <Input
                            placeholder={group.grpBio}
                            // onChange={(e) => (e.currentTarget.value)}
                          />
                        </FormControl>
                      </PopoverBody>
                      <PopoverFooter>
                        <Button
                          colorScheme="orange"
                          mr="2"
                          onClick={(): void => {
                            close();
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
                </Box>
                <>
                  <AlertDialog
                    isOpen={isAlertOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Delete Group
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
                              deleteGroup();
                              onClose();
                              Router.push("/groups");
                              toast({
                                title: "Group deleted.",
                                description: "Group deleted successfully.",
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
              </HStack>
            </Center>
          )}

          <Center pt="5">
            <Heading fontSize="4xl">{group.grpName}</Heading>
          </Center>
          <Text>{group.grpBio}</Text>
        </Box>
      );
    }
  }

  return (
    <Box>
      <DefaultErrorPage statusCode={404} />
    </Box>
  );
};

export default GroupPage;
