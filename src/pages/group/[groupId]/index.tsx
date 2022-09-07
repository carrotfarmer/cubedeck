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
  Code,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
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
  useToast,
} from "@chakra-ui/react";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../../firebase.config";
import { getGroupById, isUserInGroup, removeFromGroup } from "../../../utils";
import DefaultErrorPage from "next/error";
import { Navbar } from "../../../components/utils/nav/Navbar";
import {
  ChevronDownIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import React, { useState } from "react";
import { GroupColor } from "../../../types";
import { DEFAULT_GROUP_COLOR, GROUP_COLORS } from "../../../constants";
import { ImExit } from "react-icons/im";
import { GroupTabs } from "../../../components/groups/GroupTabs";
import { PageHead } from "../../../components/utils/PageHead";
import { Footer } from "../../../components/std/Footer";

const GroupPage: NextPage = () => {
  const router: NextRouter = useRouter();
  const { groupId } = router.query;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groupsData, loadingGroupsData, errorGroupsData] = useCollectionData(
    collection(db, "groups")
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    await deleteDoc(doc(db, "groups", String(groupId)));
  };

  const updateGroup = async (
    grpName: string,
    grpBio: string,
    grpImg: string,
    grpColor: GroupColor
  ): Promise<void> => {
    await setDoc(
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
          <PageHead title={`${group.grpName} | Cubedeck`} />
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
                                  key={color.colorName}
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
                              Are you sure you want to leave &quot;
                              {group.grpName}&quot;? You can still join again.
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
                                Leave
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
          <Center pt="5">
            Invite Code:
            <Box pl="1">
              <HStack>
                <Code>{group.inviteCode}</Code>
                <IconButton
                  icon={<CopyIcon />}
                  onClick={() => {
                    navigator.clipboard.writeText(group.inviteCode);
                    toast({
                      title: "Invite code copied.",
                      description: "Invite code copied to clipboard.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  }}
                  aria-label="copy invite code"
                  size="sm"
                  colorScheme={group.grpColor.colorVal.split(".")[0]}
                />
              </HStack>
            </Box>
          </Center>
          <Divider pt="10" />
          <Box pt="10" pb="10">
            <Center>
              <GroupTabs group={group} loggedInUser={user} />
            </Center>
          </Box>
          <Footer />
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
