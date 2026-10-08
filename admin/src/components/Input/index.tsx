import React, { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import "./input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: string | FieldError;
  className?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  isRequired?: boolean;
  autoFocus?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      leftSection,
      rightSection,
      type = "text",
      isRequired,
      autoFocus = false,
      ...rest
    },
    ref,
  ) => {
    const [showPasswordVisibility, setShowPasswordVisibility] =
      useState<boolean>(false);

    const handlePasswordVisibility = () => {
      setShowPasswordVisibility(!showPasswordVisibility);
    };

    return (
      <div className={`input-container ${className || ""}`}>
        {label && (
          <label className="input-label">
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </label>
        )}
        <div
          className={`input-wrapper ${
            type === "checkbox" ? "input-checkbox-wrapper" : ""
          }`}
        >
          {leftSection && (
            <div className="input-left-section">{leftSection}</div>
          )}
          <input
            autoFocus={autoFocus}
            ref={ref}
            type={type === "password" && showPasswordVisibility ? "text" : type}
            className={`input-field ${error ? "input-error-field" : ""}`}
            {...rest}
          />
          {type === "password" && (
            <div
              className="input-right-section cursor-pointer"
              onClick={handlePasswordVisibility}
            >
              {showPasswordVisibility ? "🙈" : "👁️"}
            </div>
          )}
          {rightSection && (
            <div className="input-right-section">{rightSection}</div>
          )}
        </div>
        {error && (
          <span className="input-error">
            {typeof error === "string" ? error : error.message}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input"; // Needed for forwardRef components

export default Input;
