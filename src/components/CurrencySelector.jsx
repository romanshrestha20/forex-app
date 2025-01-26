import React from "react";

const CurrencySelector = ({ currencies, value, onChange, label }) => {
  return (
    <div>
      <label>
        {label}:
        <select value={value} onChange={onChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default CurrencySelector;