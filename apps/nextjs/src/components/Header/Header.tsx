import { HeaderContainer, Button, Brand } from "@acme/ui";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <HeaderContainer>
      <Brand title="pkgjson" />
      <Button
        size="sm"
        isAspectSquare
        isRounded
        onClick={toggleTheme}
        icon={theme === "light" ? MdDarkMode : MdLightMode}
      />
    </HeaderContainer>
  );
};

export default Header;
