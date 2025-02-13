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

// function to format stage based on status
function formatStage(record: ProcurementRecord): string {
  const { status, awardDate, closeDate } = record;

  switch (status) {
    case 'TENDER':
      return formatTenderStatus(closeDate);
    case 'CONTRACT':
      return formatContractStatus(awardDate);
    default:
      return 'N/A';
  }
}

function formatTenderStatus(closeDate: string | null): string {
  if (closeDate === null) return 'Open until close date is specified';
  const formattedCloseDate = new Date(closeDate).toLocaleDateString();
  return isFutureDate(closeDate) ? `Open until ${formattedCloseDate}`: `Closed`;
}

function formatContractStatus(awardDate: string | null): string {
  if (awardDate === null) return 'No award date specified'
  const formattedAwardDate = new Date(awardDate).toLocaleDateString();
  return `Awarded on ${formattedAwardDate}`;
}
// function which returns true if the date is in the future and false otherwise
function isFutureDate(dateString: string): boolean {
  const checkDate = new Date(dateString);
  if (isNaN(checkDate.getTime())) {
    throw new Error('Invalid date string provided');
  }
  const now = new Date();

  // Compare the dates
  return checkDate > now;
}

export { formatCurrency, formatStage };
