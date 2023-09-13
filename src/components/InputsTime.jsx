export default function InputsTime({ value, handleChange, label, name }) {
  return (
    <>
      <label className="input-player">
        {label}
        <input
          className="input"
          type="number"
          min="1"
          name={name}
          onChange={handleChange}
          value={value}
        ></input>
      </label>
    </>
  );
}
