import { useColorMode, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Button onClick={toggleColorMode} colorScheme="blue">
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
