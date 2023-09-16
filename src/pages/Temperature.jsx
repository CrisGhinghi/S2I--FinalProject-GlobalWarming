import axios from 'axios';
import { useState, useEffect } from 'react';
import { BarChart } from '../components/BarChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faHandsHelping, faExclamationTriangle, faWater, faSun, faFish, faBug, faTree } from '@fortawesome/free-solid-svg-icons';

const fetchData = async () => {
  try {
    const response = await axios.get('https://global-warming.org/api/temperature-api');
    return response.data.result;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

const updateTemperatureData = (prevData, data) => ({
  labels: data.map((item) => item.time.slice(0, 4)),
  datasets: [
    {
      ...prevData.datasets[0],
      data: data.map((item) => item.station)
    },
    {
      ...prevData.datasets[1],
      data: data.map((item) => item.land)
    }
  ]
});

const Impacts = () => (
  <div>
    <h2 className='text-lg font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Impacts</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Extinction of animal and plant species</li>
      <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Reduction of water resources</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFish} className='mr-2 text-sm' />Damage to marine ecosystems</li>
      <li className='mb-1'><FontAwesomeIcon icon={faBug} className='mr-2 text-sm' />Increase in vector-borne diseases like malaria</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Solutions</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Reduction of greenhouse gas emissions</li>
      <li className='mb-1'><FontAwesomeIcon icon={faSun} className='mr-2 text-sm' />Use of renewable energies such as solar and wind</li>
      <li className='mb-1'><FontAwesomeIcon icon={faTree} className='mr-2 text-sm' />Reforestation and conservation of forests</li>
      <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Adoption of sustainable agricultural practices</li>
    </ul>
  </div>
);

export const Temperature = () => {
  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Station Temperature',
        data: [],
        backgroundColor: 'rgba(100, 170, 255, 0.7)',
        borderColor: '#1E90FF',
        borderWidth: 2,
      },
      {
        label: 'Land Temperature',
        data: [],
        backgroundColor: 'rgba(102, 255, 178, 0.7)',
        borderColor: '#32CD32',
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {
    fetchData().then(data => {
      setTemperatureData(prevData => updateTemperatureData(prevData, data));
    });
  }, []);

  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-sky-900 rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-cyan-400">Temperature</h1>

      <div className="prose prose-lg max-w-screen-lg">
        <p>Global warming is one of the major challenges of our time.</p>

        <p className='my-2'>It refers to the rise in average temperatures of the Earth{"'"}s surface, oceans, and atmosphere.</p>

        <p className='mb-2'>It is caused by human activities that result in the release of gases into the atmosphere which, although also present naturally, end up increasing their density, disrupting the amount of energy present on Earth and raising its global temperature.</p>

        <p>Human activities that cause global warming include the burning of fossil fuels, deforestation, and agriculture.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Impacts />
          <Solutions />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl mt-4 p-3">
        <BarChart chartData={temperatureData} />
      </div>
    </div >
  );
}
