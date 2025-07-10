import React from "react";
import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="custom-button">
      {children}
    </button>
  );
}

export default Button;
