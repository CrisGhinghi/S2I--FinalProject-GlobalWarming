import world from '../assets/img/world.png';
import worldMobile from '../assets/img/worldMobile.png';

export const Home = () => {
  return (
    <div className="relative h-[calc(100vh-56px-2rem)] flex flex-col md:flex-row items-center rounded ml-2 mr-2 md:mr-4 bg-sky-100 dark:bg-sky-900 shadow-md dark:shadow-slate-900 overflow-hidden">
      <div className=" md:max-w-md mb-10 md:mb-0 md:ml-[5%] text-center md:text-left text-sm md:text-base">
        <h1 className="my-6 md:mt-0 text-4xl md:text-7xl font-bold text-blue-900 dark:text-cyan-400">Global Warming</h1>
        <p className="mx-6 md:mx-0">
          Il riscaldamento globale è un fenomeno che riguarda l{"'"}aumento delle temperature medie
          terrestri. <br />
          <br />
          Questo fenomeno ha gravi ripercussioni sul nostro pianeta,
          causando scioglimento dei ghiacciai, innalzamento del livello del mare e
          cambiamenti climatici estremi. <br />
          <br />
          È essenziale monitorare e comprendere questi dati
          per prendere misure preventive.
        </p>
      </div>

      <div className="text-center md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:-translate-x-[-50%] h-full">
        {/* Immagine per dispositivi mobili */}
        <img src={worldMobile} alt="World" className="h-full w-full object-contain md:hidden mt-[-45px]" />

        {/* Immagine per schermi grandi */}
        <img src={world} alt="World" className="hidden md:block h-full w-full object-contain md:object-cover md:ml-0" />
      </div>

    </div>
  );
}

