export default function InputsTime({ value, handleChange, label }) {
  return (
    <>
      <label>
        {label}
        <input
          type="number"
          min="1"
          onChange={handleChange}
          value={value}
        ></input>
      </label>
    </>
  );
}
