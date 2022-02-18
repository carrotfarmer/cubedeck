import { HamburgerIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Flex,
  Heading,
  Box,
  Stack,
  Text,
  Image,
  HStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { LoginButton } from "./ProfileButton";
import { NextRouter, useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

// header animation lib
import { motion } from "framer-motion";

// heading font
import "@fontsource/staatliches";
import Link from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const router: NextRouter = useRouter();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="yellow.200"
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
              <HStack spacing="0.5">
                <Heading size="lg" color="yellow.800" letterSpacing="tight">
                  cube
                </Heading>
                <Image
                  src="https://www.pinclipart.com/picdir/big/541-5413373_clip-art-png-download.png"
                  boxSize="7"
                />
                <Heading size="lg" color="yellow.800" letterSpacing="tight">
                  deck
                </Heading>
              </HStack>
            </motion.button>
          </Box>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Mobile navbar toggle"
          bgColor="yellow.800"
          _hover={{ bgColor: "yellow.700" }}
          color="white"
        />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <HStack>
          <DarkModeSwitch />
          {router.pathname === "/" || router.pathname === `/group/[groupId]` ? (
            <Link href="/groups">
              <Button
                bgColor="yellow.800"
                _hover={{ bgColor: "yellow.700" }}
                color="white"
              >
                Groups
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button
                bgColor="yellow.800"
                _hover={{ bgColor: "yellow.700" }}
                color="white"
              >
                <Box pr="1">
                  <AiOutlineArrowLeft />
                </Box>
                Home
              </Button>
            </Link>
          )}
        </HStack>
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
