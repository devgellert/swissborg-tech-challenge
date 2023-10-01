import {
    Currency,
    EurRates,
    Transaction,
    TransactionStatus,
    TransactionType
} from "../types/api-types";

export const getTransactionTableRows = (transactions: Transaction[], eurRates: EurRates) =>
    transactions.map(transaction => [
        formatDate(transaction.timestamp),
        transaction.currency,
        String(transaction.amount),
        getEuroEquivalentString(transaction.currency, transaction.amount, eurRates),
        transaction.type,
        transaction.status
    ]);

const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    const dateElements = date.toDateString().split(' ');

    dateElements.shift();

    return dateElements.join(' ');
}

const getEuroEquivalentString = (currency: Currency, amount: number, eurRates: EurRates): string => {
    // if the amount is 0 we don't need the rate for calculation (will be 0)
    if(amount === 0) {
        return String(0);
    }

    const eurRate = eurRates[currency];

    if(eurRate === null) {
        return '-';
    }

    return String(eurRate * amount);
}

const SUMMARY_TABLE_CURRENCIES: Currency[] = ['USD', 'BTC', 'CHF'];

export const getSummaryTableRows = (transactions: Transaction[], eurRates: EurRates) =>
    SUMMARY_TABLE_CURRENCIES.map(currency =>
        calculateSummaryRow(currency, transactions, eurRates)
    )

const calculateSummaryRow = (currency: Currency, transactions: Transaction[], eurRates: EurRates): string[] => {
    const summarize = (status: TransactionStatus, type: TransactionType) =>
        transactions
            .reduce((counter, next) => (
                next.currency === currency && next.status === status && next.type === type ? counter + next.amount : counter
            ), 0);

    const completedWithdrawals = summarize('completed', 'withdrawal');

    const completedDeposits= summarize('completed', 'deposit');

    const totalBalance = completedDeposits - completedWithdrawals;

    const totalBalanceInEuros = getEuroEquivalentString(currency, totalBalance, eurRates);

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
