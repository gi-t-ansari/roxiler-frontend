import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, search, page]);

  const fetchTransactions = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/transactions?month=${selectedMonth}&search=${search}&page=${page}&perPage=10`
    );
    setTransactions(response.data);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Sold</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id} className="border">
              <td className="p-2">{txn.title}</td>
              <td className="p-2">{txn.description}</td>
              <td className="p-2">{txn.price}</td>
              <td className="p-2">{txn.sold ? "Yes" : "No"}</td>
              <td className="p-2">
                {new Date(txn.dateOfSale).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
