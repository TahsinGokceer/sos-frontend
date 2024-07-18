import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    gamesWon: number;
    totalGames: number;
  };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const winPercentage = (data.gamesWon / data.totalGames) * 100;

  const chartData = {
    labels: ['Win', 'Draw & Lost'],
    datasets: [
      {
        data: [winPercentage, 100 - winPercentage],
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(201, 203, 207, 0.8)'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255)', // Yazı rengini burada değiştirin
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;