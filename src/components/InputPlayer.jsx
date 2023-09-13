export default function InputPlayer({ name, value, onChange, label }) {
  return (
    <label className="input-player">
      {label}
      <input
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        maxLength="6"
        className="input"
      />
    </label>
  );
}
