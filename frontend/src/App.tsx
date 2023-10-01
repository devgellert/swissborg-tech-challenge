import React, {useEffect, useState} from 'react';
import {EurRates, Transaction} from "./types/api-types";
import {fetchEurRates, fetchTransactions} from "./lib/http";
import TransactionsTable from "./components/TransactionsTable";
import SummaryTable from "./components/SummaryTable";

const App = () => {
    const [isFetchError, setIsFetchError] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const [eurRates, setEurRates] = useState<EurRates | null>(null);

    useEffect(() => {
        const showError = () => setIsFetchError(true);

        fetchTransactions()
            .then((res) => setTransactions(res.transactions))
            .catch(showError);

        fetchEurRates()
            .then(setEurRates)
            .catch(showError)
    }, []);

    if (isFetchError) {
        return <div>Error</div>;
    }

    const isLoading = transactions === null || eurRates === null;

    if(isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <TransactionsTable transactions={transactions} eurRates={eurRates} />

            <SummaryTable transactions={transactions} eurRates={eurRates} />
        </main>
    );
};

export default App;
