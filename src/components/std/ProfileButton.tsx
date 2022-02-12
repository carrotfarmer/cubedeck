import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../firebase.config";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({}) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [userState, loadingState, errorState] = useAuthState(auth);

  if (userState) {
    return (
      <Menu>
        <MenuButton>
          <Avatar src={userState.photoURL} loading="eager" />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={async () => {
              await auth.signOut();
            }}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Button
      variant="outline"
      _hover={{ bg: "orange.300", borderColor: "teal.100" }}
      onClick={() => signInWithGoogle()}
      borderRadius="lg"
    >
      Login
      <Box pl={"15%"}>
        <FaGoogle />
      </Box>
    </Button>
  );
};
