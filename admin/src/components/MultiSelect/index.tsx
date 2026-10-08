// components/MultiSelect.tsx
import { useState } from "react";
import { FieldError } from "react-hook-form";
import { IoReload } from "react-icons/io5";
import { PiPlusFill } from "react-icons/pi";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  name?: string;
  label: string;
  options: Option[];
  placeholder?: string;
  error?: FieldError | string;
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
  hasHelperButton?: boolean;
  reload?: any;
  navigate?: any;
}

const MultiSelect = ({
  name,
  label,
  options,
  placeholder = "Select options...",
  error,
  value = [],
  onChange,
  className = "",
  hasHelperButton = false,
  reload,
  navigate,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (optionValue: string) => {
    const newValue = [...value, optionValue];
    onChange(newValue);
  };

  const handleRemove = (optionValue: string) => {
    const newValue = value.filter((v) => v !== optionValue);
    onChange(newValue);
  };

  // Filter out already selected options from the dropdown
  const availableOptions = options.filter(
    (option) => !value.includes(option.value),
  );

  const handleReloadButton = () => {
    reload();
  };

  const handleNavigate = () => {
    window.open(navigate, "_blank"); // Opens in a new tab
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={name} className="input-label">
            {label}
          </label>
          {hasHelperButton && (
            <div className="flex gap-[0.5rem]">
              <button type="button" onClick={handleReloadButton}>
                <IoReload size="16" className="text-gray-700" />
              </button>
              <button type="button" onClick={handleNavigate}>
                <PiPlusFill size="18" className="text-green-700" />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="relative">
        {/* Input with Tags Inside */}
        <div
          onClick={handleToggle}
          className="w-full p-2 border rounded-md bg-white flex flex-wrap items-center gap-1 min-h-[2.5rem] cursor-text focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {value.length > 0 ? (
            value.map((val) => {
              const option = options.find((opt) => opt.value === val);
              return (
                <div
                  key={val}
                  className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2 py-0.5 rounded"
                >
                  <span>{option?.label || val}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent dropdown toggle when clicking "×"
                      handleRemove(val);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              );
            })
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>

        {/* Dropdown with Unselected Options */}
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {availableOptions.length > 0 ? (
              availableOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    handleSelect(option.value);
                    // Optionally close dropdown after selection
                    // setIsOpen(false);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options available</li>
            )}
          </ul>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default MultiSelect;
