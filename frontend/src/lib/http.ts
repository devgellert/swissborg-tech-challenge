import {EurRatesResponse, TransactionsResponse} from "../types/api-types";

export const fetchTransactions = async (): Promise<TransactionsResponse> => {
    const result = await fetch('http://localhost:8080/api/transactions');

    if(!result.ok) {
        throw new Error();
    }

    return await result.json();
}

export const fetchEurRates = async (): Promise<EurRatesResponse> => {
    const result = await fetch('http://localhost:8080/api/eur-rates');

    if(!result.ok) {
        throw new Error();
    }

    return await result.json();
}
