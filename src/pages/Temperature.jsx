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
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Impatti</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Estinzione di specie animali e vegetali</li>
      <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Riduzione delle risorse idriche</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFish} className='mr-2 text-sm' />Danneggiamento degli ecosistemi marini</li>
      <li className='mb-1'><FontAwesomeIcon icon={faBug} className='mr-2 text-sm' />Aumento delle malattie trasmesse da vettori come la malaria</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Soluzioni</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Riduzione delle emissioni di gas serra</li>
      <li className='mb-1'><FontAwesomeIcon icon={faSun} className='mr-2 text-sm' />Uso di energie rinnovabili come il solare e l{"'"}eolico</li>
      <li className='mb-1'><FontAwesomeIcon icon={faTree} className='mr-2 text-sm' />Rimboschimento e conservazione delle foreste</li>
      <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Adozione di pratiche agricole sostenibili</li>
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
      <h1 className="text-4xl md:text-5xl font-bold mb-5 text-blue-900 dark:text-cyan-400">Temperatura</h1>
      <div className="prose prose-lg max-w-screen-lg">
        <p>
          Il riscaldamento globale è una delle principali sfide del nostro tempo. Esso si riferisce all{"'"}aumento delle temperature medie della superficie terrestre, degli oceani e dell{"'"}atmosfera, causato principalmente dalle attività umane, come la combustione di combustibili fossili, la deforestazione e l{"'"}agricoltura.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Impacts />
          <Solutions />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl mt-10 p-5">
        <BarChart chartData={temperatureData} />
      </div>
    </div>
  );
}
