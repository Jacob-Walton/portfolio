import React, { createContext, useContext, useEffect } from "react";
import { useAlternativeTheme } from "@/hooks/useAlternativeTheme";
import Snowfall from "@/components/alt/Snowfall";

interface AlternativeThemeContextType {
  isAlternativeTheme: boolean;
}

const AlternativeThemeContext = createContext<AlternativeThemeContextType>({
  isAlternativeTheme: false,
});

export const useAlternativeThemeContext = () =>
  useContext(AlternativeThemeContext);

interface AlternativeThemeProviderProps {
  children: React.ReactNode;
}

export const AlternativeThemeProvider: React.FC<
  AlternativeThemeProviderProps
> = ({ children }) => {
  const isAlternativeTheme = useAlternativeTheme();

  useEffect(() => {
    if (isAlternativeTheme) {
      document.documentElement.classList.add("alternative-theme");
    } else {
      document.documentElement.classList.remove("alternative-theme");
    }

    return () => {
      document.documentElement.classList.remove("alternative-theme");
    };
  }, [isAlternativeTheme]);

  return (
    <AlternativeThemeContext.Provider value={{ isAlternativeTheme }}>
      {isAlternativeTheme && <Snowfall />}
      {children}
    </AlternativeThemeContext.Provider>
  );
};

export default AlternativeThemeProvider;
