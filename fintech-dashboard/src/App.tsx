import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import TopBar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Savings from './pages/Savings';
import Investments from './pages/Investments';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import { api, setAuthToken } from './api/axios';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  profilePicture?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');

      // Fetch fresh profile to get profile picture
      api.get(`/users/${parsedUser.id}/profile`)
        .then(response => {
           const { fullName, email, profilePicture } = response.data;
           // Only update if we received meaningful data
           if (profilePicture !== undefined) {
             const updatedUser = { ...parsedUser, fullName, email, profilePicture };
             setUser(updatedUser);
             localStorage.setItem('user', JSON.stringify(updatedUser));
           }
        })
        .catch(err => console.error("Failed to refresh user profile", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'landing':
          return <LandingPage setCurrentPage={setCurrentPage} />;
        case 'login':
          return (
            <LoginPage
              setCurrentPage={setCurrentPage}
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
            />
          );
        case 'register':
          return <RegisterPage setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} />;
        default:
          return <LandingPage setCurrentPage={setCurrentPage} />;
      }
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'savings':
        return <Savings />;
      case 'investments':
        return <Investments />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} user={user} setUser={setUser} />;
      case 'settings':
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
      {!isAuthenticated ? (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
          {renderPage()}
        </div>
      ) : (
        <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
          <Sidebar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            onLogout={handleLogout}
          />
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              sidebarCollapsed ? 'ml-20' : 'ml-64'
            }`}
          >
            <TopBar darkMode={darkMode} user={user} />
            <main className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {renderPage()}
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;