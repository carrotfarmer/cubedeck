import { Box } from "@chakra-ui/react";
import React from "react";
import { Solve } from "../../types";

interface SolveRendererProps {
  solve: Solve;
}

export const SolveRenderer: React.FC<SolveRendererProps> = ({ solve }) => {
  return (
    <Box>
      {solve.minutes}: {solve.seconds}
    </Box>
  );
};
