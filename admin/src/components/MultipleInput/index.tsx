import { changeTagType } from "@/utils/generalHelper";
import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";

interface MultiInputProps {
  name: string;
  label: string;
  control: any; // react-hook-form control
  placeholder?: string;
  className?: string;
  error?: string | null;
  stackInput?: boolean;
}

const MultiInput: React.FC<MultiInputProps> = ({
  stackInput = false,
  name,
  label,
  control,
  placeholder = "Add item",
  className,
  error,
}) => {
  const [inputValue, setInputValue] = useState(""); // State for the input field
  const value = useWatch({ control, name }); // Watch the form value for changes
  const [tags, setTags] = useState<string[]>(value || []); // Initialize tags from form value

  useEffect(() => {
    // Update tags state when form value changes
    const changedTags = changeTagType(value);
    setTags(changedTags || []);
  }, [value]);

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue(""); // Clear the input field after adding
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className={className}>
      <label className="text-sm input-label text-start">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={tags}
        render={({ field: { onChange, onBlur } }) => (
          <div className="flex flex-col gap-2">
            <div
              style={stackInput ? { flexDirection: "column" } : {}}
              className="flex flex-wrap gap-2 mb-2"
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-200 rounded px-2 py-1 flex items-center w-fit"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveTag(index);
                      onChange(tags.filter((_, i) => i !== index)); // Update form value
                    }}
                    className="ml-2 text-red-600"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              placeholder={placeholder}
              className="border rounded p-2 bg-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                  onChange([...tags, inputValue]); // Update the form value with the new tag
                }
              }}
              onBlur={() => onChange(tags)}
            />
            {error && (
              <span className="text-[0.75rem] text-red-400">{error}</span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MultiInput;
