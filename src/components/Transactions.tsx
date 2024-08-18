import { useState, useEffect } from "react";

interface Product {
  productName: string;
  price: number;
  quantity: number;
}

interface Transaction {
  transactionId: string;
  transactionDate: string;
  totalAmount: number;
  transactionProduct: Product[];
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expandedTransactionId, setExpandedTransactionId] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5175/api/TransactionApi/GetTransaction");
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Transaction[] = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const toggleTransactionProducts = (transactionId: string) => {
    setExpandedTransactionId(
      expandedTransactionId === transactionId ? null : transactionId
    );
  };

  return (
    <div className="p-8 bg-gray-800 min-h-screen pl-24">
      <h3 className="text-2xl font-bold text-gray-50 mb-4">Transaction List</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.transactionId} className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
            <div
              className="cursor-pointer p-4 border-b border-gray-700"
              onClick={() => toggleTransactionProducts(transaction.transactionId)}
            >
              <p className="text-lg font-semibold text-gray-50">
                <strong>Date:</strong> {new Date(transaction.transactionDate).toLocaleString()}
              </p>
              <p className="text-lg font-semibold text-gray-50">
                <strong>Total Amount:</strong> ${transaction.totalAmount.toFixed(2)}
              </p>
            </div>
            {expandedTransactionId === transaction.transactionId && (
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-50 mb-2">Products:</h4>
                <table className="w-full border border-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-600 text-gray-50">Name</th>
                      <th className="py-2 px-4 border-b border-gray-600 text-gray-50">Price</th>
                      <th className="py-2 px-4 border-b border-gray-600 text-gray-50">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-50">
                    {transaction.transactionProduct.map((product, index) => (
                      <tr key={index} className="bg-gray-900 border-b border-gray-700">
                        <td className="py-2 px-4">{product.productName}</td>
                        <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                        <td className="py-2 px-4">{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;