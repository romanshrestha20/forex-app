import React, { useState, useEffect } from "react";
import CurrencySelector from "./components/CurrencySelector";
import AmountInput from "./components/AmountInput";
import CurrencyExchangeTable from "./components/CurrencyExchangeTable";
import { fetchExchangeRates, fetchCurrencies } from "./services/apiServices";

const App = () => {
  const [currencies, setCurrencies] = useState([]); // List of currencies
  const [baseCurrency, setBaseCurrency] = useState("USD"); // Base currency
  const [targetCurrency, setTargetCurrency] = useState("EUR"); // Target currency
  const [amount, setAmount] = useState(1); // Amount to convert
  const [convertedAmount, setConvertedAmount] = useState(null); // Converted amount
  const [exchangeRates, setExchangeRates] = useState(null); // Exchange rates data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch currencies on component mount
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const currencyList = await fetchCurrencies(baseCurrency);
        setCurrencies(currencyList);
      } catch (error) {
        setError(error.message);
      }
    };

    loadCurrencies();
  }, [baseCurrency]); // Re-fetch currencies when base currency changes

  // Fetch exchange rates when base currency, target currency, or amount changes
  useEffect(() => {
    const loadExchangeRates = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchExchangeRates(baseCurrency);
        setExchangeRates(data.conversion_rates); // Store exchange rates
        setConvertedAmount(
          (amount * data.conversion_rates[targetCurrency]).toFixed(2)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExchangeRates();
  }, [baseCurrency, targetCurrency, amount]);

  // Handle currency change
  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
  };

  // Handle amount change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Simple Forex App</h1>
      <p>Convert any currency to another currency</p>

      {/* Display errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Currency Selectors */}
      <CurrencySelector
        currencies={currencies}
        value={baseCurrency}
        onChange={handleBaseCurrencyChange}
        label="From"
      />
      <CurrencySelector
        currencies={currencies}
        value={targetCurrency}
        onChange={handleTargetCurrencyChange}
        label="To"
      />

      {/* Amount Inputs */}
      <AmountInput value={amount} onChange={handleAmountChange} label="Amount" />
      <AmountInput
        value={convertedAmount}
        onChange={handleAmountChange}
        label="Converted Amount"
        disabled // Disable editing of the converted amount
      />

      {/* Currency Exchange Table */}
      {exchangeRates && (
        <CurrencyExchangeTable exchangeRates={exchangeRates} />
      )}
    </div>
  );
};

export default App;