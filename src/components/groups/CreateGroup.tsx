import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Circle,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import Router from "next/router";
import React, { MutableRefObject, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { DEFAULT_GROUP_COLOR, GROUP_COLORS } from "../../constants";
import { auth, db } from "../../firebase.config";
import { GroupColor } from "../../types";
import { generateInviteCode } from "../../utils";

interface CreateGroupProps {}

export const CreateGroup: React.FC<CreateGroupProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [grpColor, setGrpColor] = useState<GroupColor>(DEFAULT_GROUP_COLOR);
  const [grpImgUrl, setGrpImgUrl] = useState<string>("https://broken-lmao.org");
  const [grpName, setGrpName] = useState<string>("");
  const [grpBio, setGrpBio] = useState<string>("");

  const toast = useToast();

  const initialFocusRef: React.MutableRefObject<undefined> = React.useRef();

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  const ownerDpName = user.displayName;
  const ownerUid = user.uid;
  const ownerPfp = user.photoURL;
  const inviteCode = generateInviteCode(7);

  const addGroupToFirestore = async (
    grpColor: GroupColor,
    grpImg: string,
    grpName: string,
    grpBio: string,
    grpId: string
  ) => {
    const docRef = await setDoc(doc(db, `groups/${grpId}`), {
      grpName,
      grpBio,
      grpOwner: {
        name: ownerDpName,
        uuid: ownerUid,
        profileImage: ownerPfp,
      },
      grpMembers: [
        {
          name: ownerDpName,
          uuid: ownerUid,
          profileImage: ownerPfp,
        },
      ],
      grpImg,
      grpColor,
      grpId,
      inviteCode,
      solves: [],
    });
  };

  const groupId = v4();

  return (
    <Box pt="10">
      <Button colorScheme="yellow" onClick={onOpen}>
        Create Group
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        initialFocusRef={initialFocusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel fontWeight="bold">Group Name</FormLabel>
              <Input
                placeholder="The Cubing Zone"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGrpName(e.currentTarget.value)
                }
                ref={initialFocusRef}
              />
            </FormControl>
            <FormControl pt="5">
              <FormLabel fontWeight="bold">Group Bio</FormLabel>
              <Input
                placeholder="Cubing group with class 8B"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGrpBio(e.currentTarget.value)
                }
              />
            </FormControl>
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
                    <MenuItem onClick={() => setGrpColor(color)}>
                      <Circle size="6" bg={color.colorVal} />
                      <Box pl="2">{color.colorName}</Box>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl pt="5">
              <FormLabel fontWeight="bold">Group Image</FormLabel>
              <Input
                placeholder="Image URL"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGrpImgUrl(e.currentTarget.value)
                }
              />
            </FormControl>
            <Box pt="5">
              <Avatar src={grpImgUrl} name={grpName} size="2xl" />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={() => {
                if (grpName.length >= 3 && grpBio.length >= 3) {
                  addGroupToFirestore(
                    grpColor,
                    grpImgUrl,
                    grpName,
                    grpBio,
                    groupId
                  );
                  onClose();
                  toast({
                    title: "Created Group",
                    description:
                      "Group created successfully! Invite copied to clipboard. You can now add your friends by sharing the invite code!",
                    status: "success",
                    duration: 10000,
                    isClosable: true,
                  });
                  navigator.clipboard.writeText(inviteCode);
                  Router.push(`/group/${groupId}`);
                } else {
                  toast({
                    title: "Invalid inputs",
                    description:
                      "Group name and bio must be atleast 3 characters long",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              Create!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
