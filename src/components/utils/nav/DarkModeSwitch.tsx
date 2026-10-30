import { FiMoon, FiSun } from "react-icons/fi";
import { useColorMode } from "../../ui/Providers";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? <FiMoon size={15} /> : <FiSun size={16} />}
    </button>
  );
};
