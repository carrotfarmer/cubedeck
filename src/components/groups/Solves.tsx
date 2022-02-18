import { Box } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { NewSolve } from "./NewSolve";

interface SolvesProps {
  group: DocumentData;
}

export const Solves: React.FC<SolvesProps> = ({ group }) => {
  return (
    <Box>
      <NewSolve group={group} />
    </Box>
  );
};
