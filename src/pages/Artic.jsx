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

const updateArticData = (prevData, data) => ({
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
    <h2 className='text-lg font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Impacts</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWater} className='mr-2 text-sm' />Sea level rise</li>
      <li className='mb-1'><FontAwesomeIcon icon={faPaw} className='mr-2 text-sm' />Loss of habitat for polar species</li>
      <li className='mb-1'><FontAwesomeIcon icon={faCloud} className='mr-2 text-sm' />Alterations in global weather patterns</li>
      <li className='mb-1'><FontAwesomeIcon icon={faPeopleArrows} className='mr-2 text-sm' />Negative impacts on indigenous communities</li>
    </ul>
  </div>
);

const Solutions = () => (
  <div>
    <h2 className='text-lg font-semibold mb-1 text-blue-900 dark:text-cyan-400'>Solutions</h2>
    <ul className='list-none'>
      <li className='mb-1'><FontAwesomeIcon icon={faWind} className='mr-2 text-sm' />Limit greenhouse gas emissions to slow down global warming</li>
      <li className='mb-1'><FontAwesomeIcon icon={faSnowflake} className='mr-2 text-sm' />Protect and conserve polar habitats</li>
      <li className='mb-1'><FontAwesomeIcon icon={faFlask} className='mr-2 text-sm' />Promote scientific research to monitor and better understand ongoing changes</li>
      <li className='mb-1'><FontAwesomeIcon icon={faHandsHelping} className='mr-2 text-sm' />Support indigenous communities through inclusive and sustainable policies</li>
    </ul>
  </div>
);

export const Artic = () => {
  const [articData, setArticData] = useState({
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
      setArticData(prevData => updateArticData(prevData, data));
    });
  }, []);

  return (
    <div className="md:h-[calc(100vh-56px-2rem)] flex flex-col items-center bg-sky-100 dark:bg-sky-900 rounded p-6 ml-2 mr-2 md:mr-4 shadow-md dark:shadow-slate-900 text-sm md:text-base">
      <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-cyan-400">Artic</h1>

      <div className="prose max-w-screen-lg">
        <p>
          The melting of glaciers, evident in both the Arctic and Antarctic, is a key indicator of climate change.
        </p>

        <p className='my-2'>
          They are a reservoir of water of immeasurable value and serve a protective covering function for the Earth and the oceans. Moreover, due to their reflective effect, they disperse excess heat into space and keep the planet cooler.
        </p>

        <p>
          The loss of polar ice has severe repercussions not only on the environment but also on animal species and human communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Impacts />
          <Solutions />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-100 rounded-md shadow-md w-full max-w-4xl mt-4 p-3">
        <LineChart chartData={articData} />
      </div>
    </div>
  );
}
