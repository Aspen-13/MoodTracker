import type React from "react";
import "./Header.css";

type props = {
  children: React.ReactNode;
};

function Header({ children }: props) {
  return <div className="header-card">{children}</div>;
}

export default Header;
