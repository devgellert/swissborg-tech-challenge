import React from 'react';
import Table from "../Table";
import {getTransactionTableRows} from "../../lib/utils";
import {EurRates, Transaction} from "../../types/api-types";

const HEADER_COLS = [
    'timestamp',
    'currency',
    'amount',
    'eur equiv',
    'type',
    'status'
];

type Props = {
    transactions: Transaction[];
    eurRates: EurRates;
}

const TransactionsTable = ({transactions, eurRates}: Props) => {
    const rows = getTransactionTableRows(transactions, eurRates);

    return (
        <Table
            headerCols={HEADER_COLS}
            rows={rows}
        />
    );
};

export default TransactionsTable;