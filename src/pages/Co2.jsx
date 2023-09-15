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
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Impatti</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Acidificazione degli oceani</li>
      <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Scioglimento dei ghiacciai e innalzamento del livello del mare</li>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Eventi climatici estremi come uragani e siccità</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLeaf} className='mr-2 text-sm' />Perdita di biodiversità</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Soluzioni</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Limitare le emissioni di CO2 attraverso politiche ambientali</li>
      <li className='mb-1'><FontAwesomeIcon icon={faSun} className='mr-2 text-sm' />Promuovere l{"'"}uso di energie rinnovabili</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Supportare la ricerca e lo sviluppo di tecnologie di cattura e stoccaggio del carbonio</li>
      <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Adottare stili di vita e modelli di consumo sostenibili</li>
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
      <h1 className="text-4xl md:text-5xl font-bold mb-5 text-blue-900 dark:text-cyan-400">CO2</h1>
      <ul className="prose prose-lg max-w-screen-lg">
        <p>
          L{"'"}eccesso di CO2 nell{"'"}atmosfera è una delle principali cause del cambiamento climatico. Questo gas serra, prodotto principalmente dalle attività umane come la combustione di combustibili fossili, la deforestazione e l{"'"}agricoltura, trattiene il calore nell{"'"}atmosfera, portando ad un aumento delle temperature globali.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Impacts />
          <Solutions />
        </div>
      </ul>
      <div className="bg-white dark:bg-gray-100 rounded-md shadow-lg w-full max-w-4xl mt-10 p-5">
        <LineChart chartData={co2Data} />
      </div>
    </div>
  );
}
