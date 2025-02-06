import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // For Pie charts
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, [selectedMonth]);

  const fetchChartData = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/bar-chart?month=${selectedMonth}`
    );
    setChartData(response.data);
  };

  const data = {
    labels: chartData.map((item) => item.range),
    datasets: [
      {
        label: "Number of Items",
        data: chartData.map((item) => item.count),
        backgroundColor: "blue",
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Bar Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
