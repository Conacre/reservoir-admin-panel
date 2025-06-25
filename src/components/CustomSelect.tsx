import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string | number;
  label: string;
}

export function CustomSelect({
  value,
  options,
  onChange,
  disabled = false,
}: {
  value: string | number;
  options: Option[];
  onChange: (v: string | number) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div
      className="custom-select"
      ref={ref}
      tabIndex={0}
      onClick={() => !disabled && setOpen((v) => !v)}
      onBlur={() => setOpen(false)}
      style={{ pointerEvents: disabled ? "none" : undefined }}
    >
      <div className="custom-select-value">
        {selected ? selected.label : ""}
        <span className="custom-select-arrow">
          <svg width="14" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </span>
      </div>
      {open && (
        <div className="custom-select-dropdown">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={
                "custom-select-option" +
                (opt.value === value ? " selected" : "")
              }
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}