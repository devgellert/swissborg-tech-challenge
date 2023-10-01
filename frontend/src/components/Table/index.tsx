import React from 'react';
import classNames from "classnames";
import style from './style.module.scss';
import {isTableValid} from "../../lib/utils";

type Props = {
    headerCols: string[];
    rows: string[][];
    className?: string;
}

const Table = ({ rows, headerCols, className}: Props) => {
    if(!isTableValid(headerCols, rows)) {
        return <div>Invalid table</div>;
    }

    return (
        <table className={classNames(style.Table, className)}>
            <thead>
                <tr>
                    { headerCols.map(headerCol=> <th>{headerCol}</th>) }
                </tr>
            </thead>
            <tbody>
                {
                    rows.map(row => (
                        <tr>
                            { row.map(column => <td>{column}</td>) }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default Table;
