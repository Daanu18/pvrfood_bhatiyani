import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const foodNames = [
  "BBQ Grilled Chicken Burger",
  "Chicken Tikka Sandwich",
  "Crispy Paneer Burger",
  "Large Combo Salted",
  "Large Nachos with Cheese & Salsa",
  "Large Popcorn Salted",
  "Medium Combo Caramel",
  "Medium Combo Cheese",
  "Medium Combo Salted",
  "Medium Popcorn Caramel",
  "Medium Popcorn Cheese",
  "Medium Popcorn Salted",
  "Paneer Tikka Sandwich",
  "Pepsi Large",
  "Pepsi Medium",
  "Pepsi Regular",
  "Regular Combo Caramel",
  "Regular Combo Cheese",
  "Regular Combo Salted",
  "Regular Popcorn Caramel",
  "Regular Popcorn Cheese",
  "Regular Popcorn Salted",
  "Spicy Grilled Chicken Burger",
  "Veggie Mint Chutney Burger",
];

export const FoodStats = () => {
  const chartData = {
    labels: foodNames,
    datasets: [
      {
        label: "Orders",
        data: [
          25, 15, 18, 12, 7, 10, 20, 15, 8, 12, 9, 10, 14,
          16, 13, 17, 11, 14, 10, 7, 6, 9, 8, 12,
        ],
        backgroundColor: "rgba(255, 215, 0, 0.7)",
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Most Ordered Items",
        color: "#fff",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="mb-10">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
