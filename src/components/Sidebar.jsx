import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Sidebar = ({ onSelect }) => {
    const handleItemClick = () => {
        if (onSelect) {
            onSelect();
        }
    }

    const links = [
        { path: "/", label: "Home", fontClass: "font-medium" },
        { path: "/temperature", label: "Temperature", fontClass: "font-light" },
        { path: "/co2", label: "CO2", fontClass: "font-light" },
        { path: "/metano", label: "Metano", fontClass: "font-light" },
        { path: "/no2", label: "NO2", fontClass: "font-light" },
        { path: "/ghiaccio-polare", label: "Ghiaccio Polare", fontClass: "font-light" }
    ];

    return (
        <div className="w-72 flex p-2.5 overflow-hidden">
            <div className="w-full h-auto bg-blue-900 dark:bg-sky-950 p-6 rounded shadow-md shadow-blue-950 dark:shadow-slate-950">
                <h2 className="text-3xl font-bold mb-8 text-white">Climatic</h2>
                <ul className="space-y-4">
                    {links.map(link => (
                        <li key={link.path}>
                            <Link
                                onClick={handleItemClick}
                                to={link.path}
                                className={`block text-white duration-300 hover:bg-sky-100 hover:text-blue-950 dark:hover:bg-sky-900 dark:hover:text-white hover:shadow-lg p-2 rounded ${link.fontClass}`}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    onSelect: PropTypes.func
};
