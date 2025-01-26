import React from "react";

const CurrencyExchangeTable = ({ exchangeRates }) => {
  if (!exchangeRates) return null; // Don't render if exchangeRates is not available

  return (
    <div>
      <h2>Currency Exchange Rates</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Currency</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <tr key={currency}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{currency}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyExchangeTable;