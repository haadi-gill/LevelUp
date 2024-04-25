import Card from "./Card";
import icon from "../Assets/IconBlack.ico";
import { Link, useLocation } from 'react-router-dom';
import * as UsersApi from '../../network/users_api';


export default function NavigationCard({ userId }: { userId: string}) {
    const handleLogout = async () => {
        const response = await UsersApi.logout();
        console.log(response);
    }
    
    const location = useLocation();

    const isHomePage = location.pathname === `/HomePage/${userId}`;
    const isDashboard = location.pathname === `/Dashboard/${userId}`;

    return (
        <Card>
            <div className="px-4 py-2">
                <div className="flex gap-1">
                    <img src={icon} alt="icon" style={{ width: '40px', height: '40px' }} />
                    <h2 className="text-3xl font-semibold mb-3">LevelUp</h2>
                </div>
                <Link to={`/HomePage/${userId}`} className={`flex gap-3 py-3 ${isHomePage ? 'bg-indigo-600 text-white shadow-md shadow-gray-700' : 'hover:bg-indigo-300'} -mx-10 px-10 rounded-xl transition-all hover:scale-105 hover:shadow-md hover:shadow-gray-700`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>
                    Home
                </Link>
                <Link to={`/Dashboard/${userId}`} className={`flex gap-3 py-3 ${isDashboard ? 'bg-indigo-600 text-white shadow-md shadow-gray-700' : 'hover:bg-indigo-300'} -mx-10 px-10 rounded-xl transition-all hover:scale-105 hover:shadow-md hover:shadow-gray-700`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                    </svg>
                    Dashboard
                </Link>
                <Link to="/Login" onClick={handleLogout} className={`flex gap-3 py-3 hover:bg-indigo-300 hover:shadow-md hover:shadow-gray-700 -mx-10 px-10 rounded-xl transition-all hover:scale-105 ${!isHomePage && !isDashboard ? 'hover:shadow-md' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    Logout
                </Link>
            </div>
        </Card>
    )
}

