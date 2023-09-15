import { Line } from "react-chartjs-2";
import PropTypes from 'prop-types';

export const LineChart = ({ chartData }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 0.5)'
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 25,
                    color: 'rgba(0, 0, 0, 0.7)',
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
        <Line
            className="w-full h-64"
            data={chartData}
            options={options}
        />

    );
}

LineChart.propTypes = {
    chartData: PropTypes.object.isRequired
}
