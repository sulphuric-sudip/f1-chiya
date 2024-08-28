import React from 'react';
import Loading from './Loading';

const baseURL = "https://script.google.com/macros/s/AKfycbzcm1c2NJssPcKTNhqmTUnO4Jn_xZ8Zw6XlYRT7g08CllnuOVUAGuSWWhGnrduGPY_rpw/exec"

export default function Transactions({from: currentUser}) {
    const [transactions, setTransactions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        setLoading(true);
        var tempTransactions = [];
        (async () => {
            const response = await fetch(`${baseURL}?from=${currentUser}`, {
                method: 'GET',
            });
            if (!response.ok) {
                console.error("Error in fetching transactions:", response);
                setLoading(false);
                setError("Error in fetching transactions");
                return;
            }
            const data = await response.json();
            if (data.success) {
                tempTransactions = Object.entries(data.data).map(([key, value]) => {
                    return {
                        to: key,
                        amount: value,
                        receivable: 0
                    }
                }).filter(transaction => transaction.amount > 0);
            } else {
                console.error("Error in fetching trasnsactions:", data)
            }

            const receivableResponse = await fetch(`${baseURL}?to=${currentUser}`);
            if (!receivableResponse.ok) {
                console.error("Error in fetching transactions:", receivableResponse);
                setLoading(false);
                console.error(await receivableResponse.text())
                setError("Error in fetching transactions");
                return;
            }
            const receivableData = await receivableResponse.json();
            if (receivableData.success) {
                console.log(transactions)
                tempTransactions.forEach(transaction => {
                    if (receivableData.data[transaction.to]) {
                        transaction.receivable = receivableData.data[transaction.to];
                    }
                    return transaction;
                })
                receivableData.data.forEach((key, value) => {
                    if (value === 0) return;
                    if (!tempTransactions.find(transaction => transaction.to === key)) {
                        tempTransactions.push({
                            to: key,
                            amount: 0,
                            receivable: value
                        })
                    }
                })
            } else {
                console.error("Error in fetching trasnsactions:", receivableData)
            }

            setTransactions(tempTransactions);
            setLoading(false);

        })();

    }, [currentUser]);

    const markAsDone = (from, to) => {
        return async () => {
            console.log("To mark as done", from, to);
            alert("Not implemented yet :)");
        }
    }

    return !loading && (
        <>
            <h2 className="block text-lg font-medium text-gray-700 my-4">Transactions</h2>
            <table className="table-auto w-full mt-8">
                <thead>
                    <tr>
                        <th className="border px-4 py-1">To</th>
                        <th className="border px-4 py-1">To pay</th>
                        <th className="border px-4 py-1">To receive</th>
                        <th className="border px-4 py-1">Net amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.length && transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{transaction.to}</td>
                                <td className="border px-4 py-2">{transaction.amount}</td>
                                <td className="border px-4 py-2">
                                    {transaction.receivable}
                                </td>
                                <td className="border px-4 py-2">
                                    {transaction.amount - transaction.receivable}
                                </td>
                            </tr>
                        )) || <tr><td colSpan="4" className="border px-4 py-2 text-center">No remaining transactions found</td></tr>
                    }
                </tbody>
            </table>
        </>
    ) || <Loading />;
}
