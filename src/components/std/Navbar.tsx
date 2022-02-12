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
import { LoginButton } from "./ProfileButton";

// header animation lib
import { motion } from "framer-motion";

// heading font
import "@fontsource/staatliches";
import Link from "next/link";

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
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link href="/">
          <Box boxShadow="md" borderRadius="md" width="5%">
            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 10,
              }}
            >
              <Heading as="h1" size="lg" color="orange.100">
                cubedeck
              </Heading>
            </motion.button>
          </Box>
        </Link>
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
