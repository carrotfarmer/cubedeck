import { Box, Center, Divider, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { CreateGroup } from "../components/groups/CreateGroup";
import { Navbar } from "../components/std/Navbar";

const Groups: NextPage = () => {
  return (
    <Box>
      <Navbar props={undefined} />
      <Heading fontSize="4xl" textAlign="center" pt="5">
        Groups
      </Heading>
      <Center>
        <CreateGroup />
      </Center>
      <Divider pt="5" />
    </Box>
  );
};

export default Groups;
