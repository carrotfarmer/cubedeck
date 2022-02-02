import { HamburgerIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Flex,
  Heading,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { LoginButton } from "./LoginButton";

// header animation lib
import { motion } from "framer-motion";

// heading font
import "@fontsource/staatliches";

interface NavbarProps {
  props;
}

export const Navbar: React.FC<NavbarProps> = ({ props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="orange.400"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Box boxShadow="lg">
          <motion.button
            whileHover={{
              scale: 1.1,
              rotate: 10,
            }}
          >
            <Heading as="h1" size="lg">
              cubedeck
            </Heading>
          </motion.button>
        </Box>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Docs</Text>
        <Text>Examples</Text>
        <Text>Blog</Text>
        <DarkModeSwitch />
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <LoginButton />
      </Box>
    </Flex>
  );
};
