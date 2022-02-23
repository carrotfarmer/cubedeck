import {
  Box,
  Center,
  Divider,
  Heading,
  Text,
  Image,
  Code,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Footer } from "../components/std/Footer";
import { Navbar } from "../components/std/Navbar";
import { PageHead } from "../components/utils/PageHead";

const GuidePage: NextPage = () => {
  return (
    <>
      <PageHead title="Cubedeck | Guide" />
      <Navbar />
      <Box>
        <Center pt="5">
          <Box
            borderRadius="lg"
            textColor="blue.400"
            borderColor="blue.200"
            borderWidth="thin"
          >
            <Heading fontSize="4xl" p="5">
              Cubedeck Guide
              <Divider />
            </Heading>
          </Box>
        </Center>
        <Center pt="2.5">
          <Text pl="16">
            This page will guide you through all of Cubedeck&apos;s awesome
            features! To get started create an account using Google.
          </Text>
        </Center>
        <Center pt="10">
          <Heading fontSize="3xl">
            The Concept of the App
            <Divider />
          </Heading>
        </Center>
        <Center pt="2.5" pl="16" pr="16">
          <Text>
            First, let&apos;s get familiar with the problem that this app
            strives to solve. This app was designed for cubers (people who
            solves Rubik&apos;s cubes) to track their progress by logging in
            their solve times. This also enables a cuber to get specific
            statistics about their abilities and gives them room to improve. It
            also helps cubers to practice on their own, without the need of a
            group. This app acts as an archive for all of the user&apos;s
            solves, to help them visualize how they have grown.
          </Text>
        </Center>
        <Center pt="10">
          <Heading fontSize="3xl">
            Creating a session
            <Divider />
          </Heading>
        </Center>
        <Center pt="2.5" pl="16" pr="16">
          <Text>
            A session is a container for your solve times. Think of it as a
            register, in which you can fill in details for a specific time
            period. You can create sessions for occasions like a competition, or
            a session to practice some algorithms.
            <br />
            <br />
            To create a session, click on the &apos;Create Session&apos; button
            in the home page. This will open a popup that allows you to create a
            session.
          </Text>
        </Center>
        <Center pt="2.5">
          <Image
            src="https://i.imgur.com/FWC3s2U.png"
            alt="create session modal"
            boxSize="sm"
          />
        </Center>
        <Center pt="10">
          <Heading fontSize="2xl">Solves</Heading>
        </Center>
        <Center pt="5">
          <Text pl="16" pr="16">
            You can add your solve times in a session. To do this, you have to
            time yourself (your phone&apos;s stopwatch or you can just google
            stopwatch and use it), then navigate to an individual session&apos;s
            page, and click on the add solve button. Here you can enter your
            solve time in minutes and seconds. The total limit for a solve is an
            hour (59 mins, 59 secs). After adding 2 or more solves, you will be
            able to see some meaningful statistics in the &quot;Stats&quot; tab.
            You can delete a solve by hovering over a solve to the top right
            corner, and click the delete icon.
          </Text>
        </Center>
        <Center pt="2.5">
          <Box boxSize="sm">
            <Image
              src="https://i.imgur.com/yyQkBp7.png"
              alt="creating a solve"
            />
          </Box>
        </Center>
        <Center>
          <Heading fontSize="4xl">
            Creating/Joining Groups
            <Divider />
          </Heading>
        </Center>
        <Center pt="2.5" pb="10">
          <Text pl="16" pr="16">
            You can create groups to share your solves with other cubers. To do
            this, go to the home page and then click on the &quot;Groups&quot;
            button in the navbar. Or you can manually navigate to{" "}
            <Code>cubedeck.netlify.app/groups</Code>. Then you can create a
            group, and fill out the information in the popup. Then an invite
            code will be copied to your clipboard, which you can share with your
            friends. To join a group, click on the Join Group button, and enter
            an invite code.
          </Text>
        </Center>
      </Box>
      <Footer />
    </>
  );
};

export default GuidePage;
