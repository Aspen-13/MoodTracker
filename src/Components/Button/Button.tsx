import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, disabled, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`custom-button ${className} ${disabled ? "disable" : ""}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
