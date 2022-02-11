import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { puzzleTypes } from "../../constants";
import { auth, db } from "../../firebase.config";
import { Session } from "../../types";

interface EditSessionProps {
  session: Session;
}

export const EditSession: React.FC<EditSessionProps> = ({ session }) => {
  const [user, loading, error] = useAuthState(auth);
  const [sessionTitle, setSessionTitle] = useState(session.sessionTitle);
  const [sessionNote, setSessionNote] = useState(session.sessionNotes);
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const sessionsRef = doc(db, `${user.uid}/${session.uuid}`);
  if (loading) {
    return <div>Loading...</div>;
  }

  const updateSession = async () => {
    const _doc = await updateDoc(sessionsRef, {
      sessionTitle,
      sessionNotes: sessionNote,
    });
  };

  return (
    <Popover isOpen={isOpen} onClose={close}>
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
        <PopoverHeader fontWeight="bold">Edit Session</PopoverHeader>
        <PopoverBody>
          <FormControl>
            <FormLabel>Session Name</FormLabel>
            <Input
              defaultValue={session.sessionTitle}
              onChange={(e) => setSessionTitle(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl pt="5">
            <FormLabel>Session Notes</FormLabel>
            <Input
              defaultValue={session.sessionNotes}
              onChange={(e) => setSessionNote(e.currentTarget.value)}
            />
          </FormControl>
          <Menu>
            <MenuButton pt="5%">
              <Button>Session Type</Button>
            </MenuButton>
            <MenuList>
              {puzzleTypes.map((puzzleType) => (
                <MenuItem>{puzzleType}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </PopoverBody>
        <PopoverFooter>
          <Button
            colorScheme="orange"
            mr="2"
            onClick={() => {
              updateSession();
              close();
            }}
          >
            Save
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
