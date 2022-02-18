import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Center,
  Circle,
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
  Spacer,
  Text,
  toast,
  useToast,
} from "@chakra-ui/react";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import type { NextPage } from "next";
import Router, { type NextRouter, useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase.config";
import { getGroupById, isUserInGroup, removeFromGroup } from "../../utils";
import DefaultErrorPage from "next/error";
import { Navbar } from "../../components/std/Navbar";
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Head from "next/head";
import { GroupColor } from "../../types";
import { DEFAULT_GROUP_COLOR, GROUP_COLORS } from "../../constants";
import { ImExit } from "react-icons/im";
import { GroupTabs } from "../../components/groups/GroupTabs";

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

  const [isLeaveAlertOpen, setIsLeaveAlertOpen] = useState(false);
  const onLeaveAlertClose = () => setIsLeaveAlertOpen(false);
  const leaveAlertCancelRef: React.MutableRefObject<undefined> = React.useRef();

  const toast = useToast();

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const [grpColor, setGrpColor] = useState(DEFAULT_GROUP_COLOR);

  const initialFocusRef = React.useRef();

  if (loadingGroupsData || loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>You must be logged in to view this page!</p>;
  }

  const group = getGroupById(groupId, groupsData);

  let grpName: string = group.grpName;
  let grpBio: string = group.grpBio;
  let grpImg: string = group.grpImg;

  const setGrpName = (newName: string) => (grpName = newName);
  const setGrpBio = (newBio: string) => (grpBio = newBio);
  const setGrpImg = (newImg: string) => (grpImg = newImg);

  const deleteGroup = async (): Promise<void> => {
    const _ref = await deleteDoc(doc(db, "groups", String(groupId)));
  };

  const updateGroup = async (
    grpName: string,
    grpBio: string,
    grpImg: string,
    grpColor: GroupColor
  ): Promise<void> => {
    const ref = await setDoc(
      doc(db, "groups", String(groupId)),
      {
        grpName,
        grpBio,
        grpImg,
        grpColor,
      },
      { merge: true }
    );
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
                      <PopoverHeader fontWeight="bold">
                        Edit Group
                      </PopoverHeader>
                      <PopoverBody>
                        <FormControl>
                          <FormLabel>Group Name</FormLabel>
                          <Input
                            placeholder={group.grpName}
                            onChange={(e) => setGrpName(e.currentTarget.value)}
                            ref={initialFocusRef}
                          />
                        </FormControl>
                        <FormControl pt="5">
                          <FormLabel>Group Bio</FormLabel>
                          <Input
                            placeholder={group.grpBio}
                            onChange={(e) => setGrpBio(e.currentTarget.value)}
                          />
                        </FormControl>
                        <HStack>
                          <FormControl pt="5">
                            <FormLabel>Group Image URL</FormLabel>
                            <Input
                              placeholder={group.grpImg}
                              onChange={(e) => setGrpImg(e.currentTarget.value)}
                            />
                          </FormControl>
                          <Avatar src={grpImg} name={grpName} />
                        </HStack>
                        <FormControl pt="5">
                          <FormLabel fontWeight="bold">Group Color</FormLabel>
                          <Menu>
                            <MenuButton>
                              <Button>
                                {grpColor.colorName}
                                <Box pl="2">
                                  <Circle size="6" bg={grpColor.colorVal} />
                                </Box>
                                <ChevronDownIcon pl="1" />
                              </Button>
                            </MenuButton>
                            <MenuList>
                              {GROUP_COLORS.map((color: GroupColor) => (
                                <MenuItem
                                  onClick={() => {
                                    setGrpColor(color);
                                    console.log(grpColor);
                                  }}
                                >
                                  <Circle size="6" bg={color.colorVal} />
                                  <Box pl="2">{color.colorName}</Box>
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu>
                        </FormControl>
                      </PopoverBody>
                      <PopoverFooter>
                        <Button
                          colorScheme="orange"
                          mr="2"
                          onClick={(): void => {
                            updateGroup(grpName, grpBio, grpImg, grpColor);
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
            <HStack>
              <Box>
                <Avatar src={group.grpImg} name={group.grpName} size="xl" />
              </Box>
              <Spacer />
              <Box>
                <Heading fontSize="4xl">{group.grpName}</Heading>
                {/* Leave group */}
                {user.uid !== group.grpOwner.uuid && (
                  <Box>
                    <Button
                      colorScheme="red"
                      size="xs"
                      pr="2"
                      onClick={() => setIsLeaveAlertOpen(true)}
                    >
                      <Box pr="1">
                        <ImExit />
                      </Box>
                      Leave
                    </Button>
                    <>
                      <AlertDialog
                        isOpen={isLeaveAlertOpen}
                        leastDestructiveRef={leaveAlertCancelRef}
                        onClose={onLeaveAlertClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Leave Group
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure you want to leave "{group.grpName}
                              "? You can still join again.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button
                                ref={leaveAlertCancelRef}
                                onClick={onLeaveAlertClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  removeFromGroup(group, user.uid);
                                  Router.push("/groups");
                                  toast({
                                    title: "Left group.",
                                    description: "You have left the group.",
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
                )}
              </Box>
            </HStack>
          </Center>
          <Center pt="5">
            <Text>{group.grpBio}</Text>
          </Center>
          <Divider pt="10" />
          <Box pt="10">
            <Center>
              <GroupTabs group={group} />
            </Center>
          </Box>
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
