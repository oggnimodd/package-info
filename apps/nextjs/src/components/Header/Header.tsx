import { HeaderContainer, Brand, HeaderIconButton, Container } from "@acme/ui";
import { useTheme, useIsMounted } from "hooks";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const isMounted = useIsMounted();

  return (
    <HeaderContainer>
      <Brand title="pkgjson" />
      <div className="ml-auto flex items-center gap-x-3">
        {isMounted() && (
          <HeaderIconButton
            onClick={toggleTheme}
            icon={isDark ? <MdDarkMode /> : <MdLightMode />}
          />
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
