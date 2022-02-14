import { useColorMode, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Button
      onClick={toggleColorMode}
      bgColor="yellow.400"
      _hover={{ bgColor: "yellow.500" }}
      color="yellow.900"
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
