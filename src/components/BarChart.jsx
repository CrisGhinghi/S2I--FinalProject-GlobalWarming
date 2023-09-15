import { Bar } from "react-chartjs-2"
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';

export const BarChart = ({ chartData }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 25,
                    padding: 20
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutCubic'
        }
    };

    return (
        <Bar
            className="w-full h-64"
            data={chartData}
            options={options}
        />
    );
}

BarChart.propTypes = {
    chartData: PropTypes.object.isRequired
}