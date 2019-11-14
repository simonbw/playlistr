import React, { createRef, useState } from "react";

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly className?: string;
}

export default function EditableField({
  value,
  onChange,
  className = ""
}: Props) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = createRef<HTMLInputElement>();

  return (
    <span onClick={() => setEditing(true)} className={className}>
      {editing ? (
        <input
          autoFocus
          className="EditableField"
          ref={inputRef}
          onChange={event => setInputValue(event.target.value)}
          value={inputValue}
          onBlur={() => {
            setEditing(false);
            if (value) {
              onChange(inputValue);
            }
          }}
          onKeyDown={event => {
            if (event.key === "Enter") {
              inputRef.current.blur();
            }
          }}
        />
      ) : (
        value
      )}
    </span>
  );
}
