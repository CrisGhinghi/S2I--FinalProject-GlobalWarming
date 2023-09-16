import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineChart } from '../components/LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faFlask, faHandsHelping, faExclamationTriangle, faWater, faLeaf, faSun } from '@fortawesome/free-solid-svg-icons';

const fetchData = async () => {
  try {
    const response = await axios.get('https://global-warming.org/api/co2-api');
    return response.data.co2; // Assicurati di accedere all'array 'co2'
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

const updateCo2Data = (prevData, data) => ({
  labels: data.map((item) => item.year.slice(0, 4)),
  datasets: [
    {
      ...prevData.datasets[0],
      data: data.map((item) => parseFloat(item.cycle))
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
      <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Ocean acidification</li>
      <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Melting of glaciers and rising sea levels</li>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Extreme weather events such as hurricanes and droughts</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLeaf} className='mr-2 text-sm' />Loss of biodiversity</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Solutions</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Limit CO2 emissions through environmental policies</li>
      <li className='mb-1'><FontAwesomeIcon icon={faSun} className='mr-2 text-sm' />Promote the use of renewable energies</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Support research and development of carbon capture and storage technologies</li>
      <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Adopt sustainable lifestyles and consumption patterns</li>
    </ul>
  </div>
);
export const Co2 = () => {
  const [co2Data, setCo2Data] = useState({
    labels: [],
    datasets: [
      {
        label: 'Cycle',
        backgroundColor: 'rgba(100, 170, 255, 0.5)', // Sfumatura più morbida di blu
        borderColor: '#1E90FF', // Blu acceso
        borderWidth: 2,
        fill: false,
        pointBorderWidth: 1,
        pointRadius: 1,
        lineTension: 0.4, // Set the curvature of the lines
      },
      {
        label: 'Trend',
        backgroundColor: 'rgba(102, 255, 178, 0.5)', // Sfumatura più morbida di verde
        borderColor: '#32CD32', // Verde lime
        borderWidth: 2,
        fill: false,
        pointBorderWidth: 1,
        pointRadius: 1,
        lineTension: 0.4, // Set the curvature of the lines
      }
    ]
  });

  useEffect(() => {
    fetchData().then(data => {
      setCo2Data(prevData => updateCo2Data(prevData, data));
    });
  }, []);

  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-sky-900 rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-cyan-400">CO2</h1>

      <div className="prose prose-lg max-w-screen-lg">
        <p>It is one of the main gases responsible for the greenhouse effect in the Earth{"'"}s atmosphere.</p>

        <p className='my-2'>These gases allow sunlight to penetrate the atmosphere and trap some of the heat that the Earth reflects back. This phenomenon is natural and necessary to keep the Earth warm enough to support life.</p>

        <p>However, human activities, especially the burning of fossil fuels, deforestation, and various industrial processes, have led to a significant increase in the concentrations of CO2 and other greenhouse gases in the atmosphere, amplifying the natural greenhouse effect.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Impacts />
          <Solutions />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-100 rounded-md shadow-lg w-full max-w-4xl mt-4 p-3">
        <LineChart chartData={co2Data} />
      </div>
    </div>
  );
}
