import React from "react";

const AmountInput = ({ value, onChange, label }) => {
  return (
    <div>
      <label>
        {label}:
        <input type="number" value={value} onChange={onChange} min="1" />
      </label>
    </div>
  );
};

export default AmountInput;