import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
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

const PieChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, [selectedMonth]);

  const fetchChartData = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/pie-chart?month=${selectedMonth}`
    );
    setChartData(response.data);
  };

  const data = {
    labels: chartData.map((item) => item._id),
    datasets: [
      {
        label: "Category Distribution",
        data: chartData.map((item) => item.count),
        backgroundColor: ["red", "blue", "green", "yellow", "purple"],
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
