import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineChart } from '../components/LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faSnowflake, faFlask, faHandsHelping, faExclamationTriangle, faCar, faIndustry, faLungs } from '@fortawesome/free-solid-svg-icons';

const fetchData = async () => {
  try {
    const response = await axios.get('https://global-warming.org/api/nitrous-oxide-api');
    return response.data.nitrous;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

const updateNo2Data = (prevData, data) => ({
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
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Impacts</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faExclamationTriangle} className='mr-2 text-sm' />Contribution to the greenhouse effect</li>
      <li className='mb-1'><FontAwesomeIcon icon={faCar} className='mr-2 text-sm' />Formation of smog and acid rain</li>
      <li className='mb-1'><FontAwesomeIcon icon={faLungs} className='mr-2 text-sm' />Negative effects on respiratory health</li>
      <li className='mb-1'><FontAwesomeIcon icon={faIndustry} className='mr-2 text-sm' />Damage to vegetation and aquatic ecosystems</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Solutions</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Limit NO2 emissions through environmental policies</li>
      <li className='mb-1'><FontAwesomeIcon icon={faSnowflake} className='mr-2 text-sm' />Promote the use of low-emission or electric vehicles</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Adopt filtration technologies in industries and power plants</li>
      <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Inform and raise awareness among the population about the risks associated with NO2 exposure</li>
    </ul>
  </div>
);

export const No2 = () => {
  const [no2Data, setNo2Data] = useState({
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
      setNo2Data(prevData => updateNo2Data(prevData, data));
    });
  }, []);

  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-sky-900 rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl md:text-5xl font-bold mb-5 text-blue-900 dark:text-cyan-400">NO2</h1>
      <ul className="prose max-w-screen-lg">
        <p>
        Nitrogen dioxide is a greenhouse gas and an atmospheric pollutant that can have severe effects on human health and the environment. It is primarily produced from the combustion of fossil fuels in vehicles and power plants, as well as from industrial processes. Its presence in the atmosphere can contribute to the greenhouse effect and the formation of smog.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Impacts />
          <Solutions />
        </div>
      </ul>
      <div className="bg-white dark:bg-gray-100 rounded-md shadow-md w-full max-w-4xl mt-5 p-5">
        <LineChart chartData={no2Data} />
      </div>
    </div>
  );
}
