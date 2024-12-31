import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement);
function ChartCard({ title, description, chartType, chartData, updatedAt }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-96 grow">
      <div className="h-80">
        {chartType === "bar" ? (
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        ) : (
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        )}
      </div>
      <h3 className="text-lg font-bold mt-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-400 mt-2">{updatedAt}</p>
    </div>
  );
}

export default ChartCard
