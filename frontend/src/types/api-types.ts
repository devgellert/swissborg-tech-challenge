// Base Types

export type Currency = "BTC" | "USD" | "CHF";

export type TransactionType = "withdrawal" | "deposit";

export type TransactionStatus = "pending" | "completed";

export type Transaction = {
    id: string;
    timestamp: string;
    type: TransactionType;
    status: TransactionStatus;
    currency: Currency;
    amount: number;
};

export type EurRates = {
    [key in Currency]: number | null;
};

// Responses

export type EurRatesResponse = EurRates;

export type TransactionsResponse = { transactions: Transaction[]; }
