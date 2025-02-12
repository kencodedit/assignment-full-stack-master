import { ProcurementRecord } from './Api';

// Utility function to format value based on currency
function formatCurrency(value: number | null, currency: string | null): string {
  if (value !== null && currency !== null) {
    let formattedCurrency = '';
    let formattedValue = value.toLocaleString();

    if (currency === 'GBP') {
      formattedCurrency = `£${formattedValue}`;
    } else if (currency === 'GBP/day') {
      formattedCurrency = `£${formattedValue}/day`;
    } else if (currency === 'EUR') {
      formattedCurrency = `€${formattedValue}`;
    } else {
      formattedCurrency = `${currency} ${formattedValue}`; //to catch all other currencies
    }

    return formattedCurrency;
  }

  return 'N/A'; // returning 'N/A' if value or currency is null
}

export { formatCurrency };
