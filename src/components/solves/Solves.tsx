import { Box } from "@chakra-ui/react";
import React from "react";
import { Session } from "../../types";
import { SolveRenderer } from "./SolveRenderer";
interface SolvesProps {
  session: Session;
}

export const Solves: React.FC<SolvesProps> = ({ session }) => {
  return (
    <Box pl="5%" pt="5%">
      {session.solves.map((solve) => (
        <SolveRenderer solve={solve} />
      ))}
    </Box>
  );
};
