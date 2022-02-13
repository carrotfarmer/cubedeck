import { Box, SimpleGrid, Icon } from "@chakra-ui/react";
import {
  FcViewDetails,
  FcDonate,
  FcInTransit,
  FcTodoList,
  FcBullish,
  FcConferenceCall,
} from "react-icons/fc";
import { Feature } from "./Feature";

interface FeaturesGridProps {}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({}) => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} pr="10" pl="10">
        <Feature
          icon={<Icon as={FcTodoList} w={16} h={16} />}
          title="Log your solve times"
          text="Create practice sessions and time yourself, log your solve times to keep track of your progress."
        />
        <Feature
          icon={<Icon as={FcBullish} w={16} h={16} />}
          title="Stats"
          text={
            "Check out your session statistics to get info about your average solve times, fastest and slowest solves and personal bests."
          }
        />
        <Feature
          icon={<Icon as={FcConferenceCall} w={16} h={16} />}
          title="Compete with your friends"
          text={
            "Create group sessions to compete with your friends with exclusive leaderboards and various other group stats."
          }
        />
      </SimpleGrid>
    </Box>
  );
};
