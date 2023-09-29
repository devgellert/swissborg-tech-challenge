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

// Responses

export type EurRatesResponse = {
    [key in Currency]: number | null;
};

export type TransactionsResponse = Transaction[];
