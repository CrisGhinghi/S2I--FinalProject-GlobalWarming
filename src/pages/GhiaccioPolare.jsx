import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineChart } from '../components/LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faPaw, faCloud, faPeopleArrows, faWind, faSnowflake, faFlask, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

const fetchData = async () => {
  try {
    const response = await axios.get('https://global-warming.org/api/arctic-api');
    return response.data.arcticData;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

const updateGhiaccioPolareData = (prevData, data) => ({
  labels: data.map((item) => item.year.toString()),
  datasets: [
    {
      ...prevData.datasets[0],
      data: data.map((item) => item.extent)
    },
    {
      ...prevData.datasets[1],
      data: data.map((item) => item.area)
    }
  ]
});

const Impacts = () => (
  <div>
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Impatti</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Innalzamento del livello del mare</li>
      <li className='mb-1'><FontAwesomeIcon icon={faPaw} className='mr-2 text-sm' />Perdita di habitat per specie polarizzate</li>
      <li className='mb-1'><FontAwesomeIcon icon={faCloud} className='mr-2 text-sm' />Alterazioni dei modelli meteorologici globali</li>
      <li className='mb-1'><FontAwesomeIcon icon={faPeopleArrows} className='mr-2 text-sm' />Impatti negativi sulle comunità indigene</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Soluzioni</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Limitare le emissioni di gas serra per rallentare il riscaldamento globale</li>
      <li className='mb-1'><FontAwesomeIcon icon={faSnowflake} className='mr-2 text-sm' />Proteggere e conservare gli habitat polari</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Promuovere la ricerca scientifica per monitorare e comprendere meglio i cambiamenti in atto</li>
      <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Sostenere le comunità indigene attraverso politiche inclusive e sostenibili</li>
    </ul>
  </div>
);

export const GhiaccioPolare = () => {
  const [ghiaccioPolare, setGhiaccioPolare] = useState({
    labels: [],
    datasets: [
      {
        label: "Extent",
        backgroundColor: 'rgba(100, 170, 255, 0.5)', // Sfumatura più morbida di blu
        borderColor: '#1E90FF', // Blu acceso
        borderWidth: 2,
        fill: false,
        pointBorderWidth: 0,
        pointRadius: 0,
        lineTension: 0.4, // Set the curvature of the lines
      },
      {
        label: "Area",
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
      setGhiaccioPolare(prevData => updateGhiaccioPolareData(prevData, data));
    });
  }, []);

  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-sky-900 rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl md:text-5xl font-bold mb-5 text-blue-900 dark:text-cyan-400">Ghiaccio Polare</h1>
      <ul className="prose max-w-screen-lg">
        <p>
          Il ghiaccio polare, presente sia nell Artico che nell Antartico, è un indicatore chiave dei cambiamenti climatici. La sua fusione accelera il riscaldamento globale, poiché il ghiaccio riflette la luce solare, mentre l acqua la assorbe. La perdita di ghiaccio polare ha gravi ripercussioni non solo sull ambiente, ma anche su specie animali e comunità umane.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Impacts />
          <Solutions />
        </div>
      </ul>
      <div className="bg-white dark:bg-gray-100 rounded-md shadow-md w-full max-w-4xl mt-5 p-5">
        <LineChart chartData={ghiaccioPolare} />
      </div>
    </div>
  );
}
