import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineChart } from '../components/LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faFlask, faExclamationTriangle, faWater, faLeaf, faTrashAlt, faLungs } from '@fortawesome/free-solid-svg-icons';

const fetchData = async () => {
  try {
    const response = await axios.get('https://global-warming.org/api/methane-api');
    return response.data.methane;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

const updateMethaneData = (prevData, data) => ({
  labels: data.map((item) => item.date.slice(0, 4)),
  datasets: [
    {
      ...prevData.datasets[0],
      data: data.map((item) => parseFloat(item.average))
    },
    {
      ...prevData.datasets[1],
      data: data.map((item) => parseFloat(item.trend))
    }
  ]
});

const Impacts = () => (
  <div>
    <h2 className='text-lg font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Impacts</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Intensification of the greenhouse effect</li>
      <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Contribution to ocean acidification</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLeaf} className='mr-2 text-sm' />Alteration of natural ecosystem cycles</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLungs} className='mr-2 text-sm' />Impacts on human health due to air pollution</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Solutions</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Limit methane emissions through environmental policies</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Adopt methane capture and storage technologies</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLeaf} className='mr-2 text-sm' />Promote sustainable agricultural practices that reduce methane emissions</li>
      <li className='mb-1'><FontAwesomeIcon icon={faTrashAlt} className='mr-2 text-sm' />Sustainable waste management to reduce anaerobic decomposition</li>
    </ul>
  </div>
);

export const Methane = () => {
  const [methaneData, setMethaneData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average',
        backgroundColor: 'rgba(100, 170, 255, 0.5)', // Sfumatura più morbida di blu
        borderColor: '#1E90FF', // Blu acceso
        borderWidth: 2,
        fill: false,
        pointBorderWidth: 0,
        pointRadius: 0,
        lineTension: 0.4, // Set the curvature of the lines
      },
      {
        label: 'Trend',
        backgroundColor: 'rgba(102, 255, 178, 0.5)', // Sfumatura più morbida di verde
        borderColor: '#32CD32', // Verde lime
        borderWidth: 2,
        fill: false,
        pointBorderWidth: 0,
        pointRadius: 0,
        lineTension: 0.4, // Set the curvature of the lines
      }
    ]
  });

  useEffect(() => {
    fetchData().then(data => {
      setMethaneData(prevData => updateMethaneData(prevData, data));
    });
  }, []);

  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-sky-900 rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-cyan-400">Methane</h1>

      <div className="prose max-w-screen-lg">
        <p>
          The second anthropogenic greenhouse gas, and the most abundant after carbon dioxide, methane accounts for about 20% of global emissions, significantly impacting Earth{"'"}s temperature and the climate system.
        </p>

        <p className='my-2'>
          Although methane is far less abundant in the atmosphere compared to CO2, it has a much greater warming potential.
        </p>

        <p>
          The main sources of methane emissions are agriculture, the production and transport of coal, oil, and gas, and the decomposition of organic waste in disposal sites.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Impacts />
          <Solutions />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-100 rounded-md shadow-lg w-full max-w-4xl mt-4 p-3">
        <LineChart chartData={methaneData} />
      </div>
    </div>
  );
}
