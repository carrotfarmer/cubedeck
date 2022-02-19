import { Box, SimpleGrid } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { GroupSolve, Solve } from "../../types";
import { NewSolve } from "./NewSolve";
import { GroupSolveRenderer } from "./GroupSolveRenderer";

interface SolvesProps {
  group: DocumentData;
}

export const Solves: React.FC<SolvesProps> = ({ group }) => {
  const solves: GroupSolve[] = group.solves;
  // console.log(solves);
  return (
    <Box pt="2.5%">
      <SimpleGrid columns={[2, 4, 6]} spacing="12">
        <NewSolve group={group} />
        {solves.map((solve: GroupSolve) => (
          <>
            <GroupSolveRenderer
              solve={solve}
              groupColor={group.grpColor}
              group={group}
            />
          </>
        ))}
      </SimpleGrid>
    </Box>
  );
};
