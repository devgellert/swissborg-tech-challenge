import {
    Currency,
    EurRates,
    EurRatesResponse,
    Transaction,
    TransactionStatus,
    TransactionType
} from "../types/api-types";

export const getTransactionTableRows = (transactions: Transaction[], eurRatesResponse: EurRates) =>
    transactions.map(transaction => [
        formatDate(transaction.timestamp),
        transaction.currency,
        String(transaction.amount),
        getEuroEquivalentString(transaction.currency, transaction.amount, eurRatesResponse),
        transaction.type,
        transaction.status
    ]);

const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    const dateElements = date.toDateString().split(' ');

    dateElements.shift();

    return dateElements.join(' ');
}

const getEuroEquivalentString = (currency: Currency, amount: number, eurRatesResponse: EurRatesResponse): string => {
    const eurRate = eurRatesResponse[currency];

    if(eurRate === null) {
        return '-';
    }

    // if the amount is 0 we don't need the rate for calculation (will be 0)
    if(amount === 0) {
        return String(0);
    }

    return String(eurRate * amount);
}

const SUMMARY_TABLE_CURRENCIES: Currency[] = ['USD', 'BTC', 'CHF'];

export const getSummaryTableRows = (transactions: Transaction[], eurRatesResponse: EurRatesResponse) =>
    SUMMARY_TABLE_CURRENCIES.map(currency =>
        calculateSummaryRow(currency, transactions, eurRatesResponse)
    )

const calculateSummaryRow = (currency: Currency, transactions: Transaction[], eurRatesResponse: EurRatesResponse): string[] => {
    const summarize = (status: TransactionStatus, type: TransactionType) =>
        transactions
            .reduce((counter, next) => (
                next.currency === currency && next.status === status && next.type === type ? counter + next.amount : counter
            ), 0);

    const completedWithdrawals = summarize('completed', 'withdrawal');

    const completedDeposits= summarize('completed', 'deposit');

    const totalBalance = completedDeposits - completedWithdrawals;

    const totalBalanceInEuros = getEuroEquivalentString(currency, totalBalance, eurRatesResponse);

    return [
        currency,
        completedWithdrawals,
        completedDeposits,
        summarize('pending', 'withdrawal'),
        summarize('pending', 'deposit'),
        totalBalance,
        totalBalanceInEuros
    ].map(String)
}

export const isTableValid = (headerCols: string[], rows: string[][]) =>
    rows.reduce((isValid, row) => row.length === headerCols.length ? isValid && true : false, true)
