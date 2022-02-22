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
import Router from "next/router";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
              Router.push("/");
            }}
          >
            Log Out
          </MenuItem>
          <MenuItem onClick={() => Router.push("/guide")}>Guide</MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Button
      bgColor="yellow.300"
      _hover={{ bgColor: "yellow.400" }}
      onClick={() => signInWithGoogle()}
      borderRadius="lg"
      color="yellow.900"
    >
      Login
      <Box pl={"15%"}>
        <FaGoogle />
      </Box>
    </Button>
  );
};
