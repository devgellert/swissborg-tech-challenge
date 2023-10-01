import React from 'react';
import Table from "../Table";
import {getSummaryTableRows} from "../../lib/utils";
import {EurRatesResponse, Transaction} from "../../types/api-types";
import style from './style.module.scss';

const HEADER_COLS = [
    'currency',
    'total completed withdrawals',
    'total completed deposits',
    'total pending withdrawals',
    'total pending deposits',
    'total balance (completed deposits - completed withdrawals)',
    'total balance eur equiv'
];

type Props = {
    transactions: Transaction[];
    eurRates: EurRatesResponse;
}

const SummaryTable = ({transactions, eurRates}: Props) => {
    const rows = getSummaryTableRows(transactions, eurRates);

    return (
        <Table
            className={style.SummaryTable}
            headerCols={HEADER_COLS}
            rows={rows}
        />
    );
};

export default SummaryTable;
