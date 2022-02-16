import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase.config";
import { getGroupByInviteCode } from "../../utils";

interface JoinGroupProps {}

export const JoinGroup: React.FC<JoinGroupProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, loading, error] = useAuthState(auth);
  const [inviteCode, setInviteCode] = useState<string>("");
  const [groupsData, loadingData, errorData] = useCollectionData(
    collection(db, "groups")
  );
  const [grp, setGrp] = useState<DocumentData | null>(null);
  const focusRef = React.useRef();

  const toast = useToast();

  if (loading || loadingData) {
    return <p>loading...</p>;
  }

  const joinGroup = async (inviteCode: string): Promise<null | void> => {
    const group: DocumentData = getGroupByInviteCode(inviteCode, groupsData);

    setGrp(group);
    const groupRef: DocumentReference<DocumentData> = doc(
      db,
      `groups/${group.grpId}`
    );

    await updateDoc(groupRef, {
      grpMembers: arrayUnion({
        name: user.displayName,
        uuid: user.uid,
        profileImage: user.photoURL,
      }),
    });
  };

  return (
    <>
      <Box pt="10">
        <Button colorScheme="yellow" onClick={onOpen}>
          Join Group
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={focusRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel fontWeight="bold">Enter invite code</FormLabel>
            <FormControl>
              <Input
                placeholder="Eg: 2MJ9xb9"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInviteCode(e.currentTarget.value)
                }
                ref={focusRef}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={() => {
                if (grp !== null) {
                  joinGroup(inviteCode);
                  toast({
                    title: "Joined Group!",
                    description: `You have successfully joined ${grp.grpName}!`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  onClose();
                } else {
                  toast({
                    title: "Invalid Invite Code",
                    description: "No group with this invite code.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              Join!
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
