import { memo } from "react";

function ComboBoxComponent({ value = undefined, onChange, label, options }) {
  return (
    <>
      <label>{label}</label>

      <select onChange={onChange} className="themeSelect" value={value}>
        {options.map((option, index) => (
          <option key={option} value={index + 1}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
const ComboBox = memo(ComboBoxComponent);
export default ComboBox;
