import { CustomSelect } from "./CustomSelect";
import "./../styles/ReservoirField.css";

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
          <div style={{ position: "relative", width: "100%" }}>
            <CustomSelect
              value={value}
              options={options}
              onChange={onChange!}
            />
          </div>
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange?.(e.target.value)}
          />
        )
      ) : (
        <div className="info-field-view">{value}</div>
      )}
    </div>
  );
}