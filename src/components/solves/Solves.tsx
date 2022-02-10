import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Session, Solve } from "../../types";
import { NewSolve } from "./NewSolve";
import { SolveRenderer } from "./SolveRenderer";
interface SolvesProps {
  session: Session;
}

export const Solves: React.FC<SolvesProps> = ({ session }) => {
  return (
    <Box pl="5%" pt="5%" pr="5%">
      <SimpleGrid columns={[2, 4, 6]} spacing="12">
        <NewSolve session={session} />
        {session.solves.map((solve: Solve) => (
          <SolveRenderer solve={solve} session={session} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
