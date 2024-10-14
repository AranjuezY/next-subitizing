import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(PointElement, Tooltip, Legend, LinearScale, Title);

export interface DataPoint {
  x: number;     // number of dots
  y: number;     // time spent
  correct: boolean;
}

interface ScatterPlotProps {
  data: DataPoint[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: "Correct Answers",
        data: data.filter((point) => point.correct).map((point) => ({ x: point.x, y: point.y })),
        backgroundColor: "green",
        borderColor: "green",
        pointRadius: 5,
      },
      {
        label: "Incorrect Answers",
        data: data.filter((point) => !point.correct).map((point) => ({ x: point.x, y: point.y })),
        backgroundColor: "red",
        borderColor: "red",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear" as const, // Ensure this matches the expected type
        title: {
          display: true,
          text: "Number of Dots",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time Spent (ms)",
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default ScatterPlot;
