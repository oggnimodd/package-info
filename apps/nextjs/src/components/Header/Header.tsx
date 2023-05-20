import { HeaderContainer, Brand, HeaderIconButton } from "@acme/ui";
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
      <HeaderIconButton
        onClick={toggleTheme}
        icon={theme === "light" ? <MdLightMode /> : <MdDarkMode />}
      />
    </HeaderContainer>
  );
};

export default Header;
