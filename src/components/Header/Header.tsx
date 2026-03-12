import { useTheme } from "../../context/ThemeContext";

import "./Header.css";

export interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__spacer" />

      <div className="header__title">Refurbished Computer Store</div>

      <div className="header__actions">
        <button className="header__theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </header>
  );
};
