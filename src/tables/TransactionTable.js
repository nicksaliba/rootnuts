import React from "react";
//import Keyword from '../components/keyword'
const TransactionTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>From</th>
        <th>To</th>
        <th>States</th>
        <th>Weight</th>
        <th>Cost</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.transactions.length > 0 ? (
        props.transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.from}</td>
            <td>{transaction.to}</td>
            <td>{transaction.state}</td>
            <td>{transaction.weight}</td>
            <td>{transaction.cost}</td>
            <td>
              {
                <button
                  onClick={() => {
                    props.editRow(transaction);
                  }}
                  className="button muted-button"
                >
                  Edit
                </button>
              }
              <button onClick={() => props.deleteTransaction(transaction.id)} className="button muted-button">
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No Transactions</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default TransactionTable;
