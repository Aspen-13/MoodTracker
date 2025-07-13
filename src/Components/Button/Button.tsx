import React from "react";
import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  classname?: string;
};

function Button({ children, onClick, classname }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classname ? classname : "custom-button"}
    >
      {children}
    </button>
  );
}

export default Button;
