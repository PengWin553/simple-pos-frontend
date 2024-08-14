import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/api/TransactionApi/GetTransaction");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const toggleTransactionProducts = (transactionId) => {
    setExpandedTransactionId(
      expandedTransactionId === transactionId ? null : transactionId
    );
  };

  return (
    <div className="transaction-list-container">
      <h3>Transaction List</h3>
      {transactions.map((transaction) => (
        <div key={transaction.transactionId} className="transaction-item">
          <div
            className="transaction-header"
            onClick={() => toggleTransactionProducts(transaction.transactionId)}
            style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd", marginBottom: "5px" }}
          >
            <p><strong>Date:</strong> {new Date(transaction.transactionDate).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ${transaction.totalAmount.toFixed(2)}</p>
          </div>
          {expandedTransactionId === transaction.transactionId && (
            <div className="transaction-products" style={{ paddingLeft: "20px", marginBottom: "10px" }}>
              <h4>Products:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.transactionProduct.map((product, index) => (
                    <tr key={index}>
                      <td>{product.productName}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Transactions;
