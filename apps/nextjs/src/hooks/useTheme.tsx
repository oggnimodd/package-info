import { useTheme as useNextTheme } from "next-themes";

const useTheme = () => {
  const { theme, setTheme, ...rest } = useNextTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return {
    toggleTheme,
    theme,
    setTheme,
    isDark,
    ...rest,
  };
};

export default useTheme;
