import { Box } from "@chakra-ui/react";
import React from "react";
import { Session, Solve } from "../../types";

interface SolvesRendererProps {
  session: Session;
}

export const SolvesRenderer: React.FC<SolvesRendererProps> = ({ session }) => {
  return (
    <Box>
      {session.solves.map((solve: Solve) => (
        <Box key={solve.id}>
          {solve.minutes}:{solve.seconds}
        </Box>
      ))}
    </Box>
  );
};
