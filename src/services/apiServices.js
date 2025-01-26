import axios from "axios";

const API_KEY = "77cdeb4010295f165cfc24db"; // Replace with your API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

/**
 * Fetches the latest exchange rates for a base currency.
 * @param {string} baseCurrency - The base currency code (e.g., "USD").
 * @returns {Promise} - A promise that resolves to the API response.
 */
export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/latest/${baseCurrency}`);
    if (response.data.result === "success") {
      return response.data;
    } else {
      throw new Error(response.data["error-type"] || "Unknown API error");
    }
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
};
/**
 * Fetches the list of supported currencies and ensures the base currency is included.
 * @param {string} baseCurrency - The base currency code (e.g., "USD").
 * @returns {Promise} - A promise that resolves to the list of currencies.
 */

export const fetchCurrencies = async (baseCurrency) => {
    try {
        const response = await axios.get(`${BASE_URL}/codes`);
        if (response.data.result === "success") {
        const currencies = response.data.supported_codes;
        if (!currencies.includes(baseCurrency)) {
            currencies.push(baseCurrency);
        }
        return currencies;
        } else {
        throw new Error(response.data["error-type"] || "Unknown API error");
        }
    } catch (error) {
        throw new Error("Failed to fetch data. Please try again later.");
    }
    }