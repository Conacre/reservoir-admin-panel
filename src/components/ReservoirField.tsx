export function ReservoirField({
  icon,
  value,
  editable = false,
  type = "text",
  options,
  onChange,
}: {
  icon: string;
  value: string | number;
  editable?: boolean;
  type?: string;
  options?: { value: string | number; label: string }[];
  onChange?: (v: string | number) => void;
}) {
  return (
    <div className="info-field">
      <span className="icons">
        <img src={icon} alt="" width={27} height={27} />
      </span>
      {editable ? (
        options ? (
          <select value={value} onChange={e => onChange?.(e.target.value)}>
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            min={type === "number" ? 0 : undefined}
          />
        )
      ) : (
        <div className="info-field-view">{value}</div>
      )}
    </div>
  );
}