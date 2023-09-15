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

const updateMetanoData = (prevData, data) => ({
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
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Impatti</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Intensificazione dell{"'"}effetto serra</li>
      <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Contributo all{"'"}acidificazione degli oceani</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLeaf} className='mr-2 text-sm' />Alterazione dei cicli naturali dell{"'"}ecosistema</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLungs} className='mr-2 text-sm' />Impatti sulla salute umana a causa dell{"'"}inquinamento dell{"'"}aria</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Soluzioni</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Limitare le emissioni di metano attraverso politiche ambientali</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Adottare tecnologie di cattura e stoccaggio del metano</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLeaf} className='mr-2 text-sm' />Promuovere pratiche agricole sostenibili che riducano le emissioni di metano</li>
      <li className='mb-1'><FontAwesomeIcon icon={faTrashAlt} className='mr-2 text-sm' />Gestione sostenibile dei rifiuti per ridurre la decomposizione anaerobica</li>
    </ul>
  </div>
);

export const Metano = () => {
  const [metanoData, setMetanoData] = useState({
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
      setMetanoData(prevData => updateMetanoData(prevData, data));
    });
  }, []);

  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-sky-900 rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl md:text-5xl font-bold mb-5 text-blue-900 dark:text-cyan-400">Metano</h1>
      <ul className="prose max-w-screen-lg">
        <p>
          Il metano è uno dei principali gas serra presenti nell{"'"}atmosfera. Anche se è presente in quantità minori rispetto alla CO2, ha un potere di riscaldamento molto maggiore. Le principali fonti di emissione di metano sono l{"'"}agricoltura, la produzione e il trasporto di carbone, petrolio e gas, e la decomposizione dei rifiuti organici nei siti di smaltimento.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Impacts />
          <Solutions />
        </div>
      </ul>
      <div className="bg-white dark:bg-gray-100 rounded-md shadow-lg w-full max-w-4xl mt-5 p-5">
        <LineChart chartData={metanoData} />
      </div>
    </div>
  );
}
