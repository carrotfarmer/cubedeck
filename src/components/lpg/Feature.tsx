import { Stack, Flex, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

export const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex w={16} h={16} align={"center"} justify={"center"} mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text>{text}</Text>
    </Stack>
  );
};
