import React, { useState } from 'react';
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

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'landing':
          return <LandingPage setCurrentPage={setCurrentPage} />;
        case 'login':
          return <LoginPage setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} />;
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
        return <ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />;
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
            setIsAuthenticated={setIsAuthenticated}
          />
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              sidebarCollapsed ? 'ml-20' : 'ml-64'
            }`}
          >
            <TopBar darkMode={darkMode} />
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