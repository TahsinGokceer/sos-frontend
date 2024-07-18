import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: {
    gamesWon: number;
    gamesDraw: number;
    gamesLost: number;
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Win', 'Draw', 'Lost'],
    datasets: [
      {
        barPercentage: 0.6,
        label: 'Games',
        data: [data.gamesWon, data.gamesDraw, data.gamesLost],
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(255, 99, 132, 0.8)'],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
          stepSize: 1, // 1, 2, 3 şeklinde artış
        },
      },
      x: {
        ticks: {
          color: 'white', // X ekseni yazı rengini beyaz yapma
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'white', // Legend yazı rengini beyaz yapma
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;