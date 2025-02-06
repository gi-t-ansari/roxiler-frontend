import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = ({ selectedMonth }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/statistics?month=${selectedMonth}`
    );
    setStats(response.data);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Statistics</h2>
      <p className="text-gray-700">Total Sales: ${stats.totalSales}</p>
      <p className="text-gray-700">Total Sold Items: {stats.totalSold}</p>
      <p className="text-gray-700">
        Total Not Sold Items: {stats.totalNotSold}
      </p>
    </div>
  );
};

export default Statistics;
