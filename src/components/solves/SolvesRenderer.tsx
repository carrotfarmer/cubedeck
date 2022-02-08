import { Box } from "@chakra-ui/react";
import React from "react";
import { Session } from "../../types";

interface SolvesRendererProps {
  session: Session;
}

export const SolvesRenderer: React.FC<SolvesRendererProps> = ({ session }) => {
  return (
    <Box>
      {session.solves.map((solve) => (
        <Box key={solve.id}>
          {solve.minutes}:{solve.seconds}
        </Box>
      ))}
    </Box>
  );
};
