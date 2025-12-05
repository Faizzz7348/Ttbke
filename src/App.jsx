import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, Home, Users, Settings, FileText, 
  BarChart, MessageSquare, Sun, Moon, Waves, Terminal, Truck, Clock, Calendar 
} from 'lucide-react';
import Route from './pages/Route';
import CalendarPage from './pages/CalendarPage';
import MonitorExpired from './pages/MonitorExpired';
import './App.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [activePage, setActivePage] = useState('dashboard');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [fontSize, setFontSize] = useState(16);
  const sidebarRef = useRef(null);

  const themes = [
    { name: 'light', icon: Sun, label: 'Light Mode' },
    { name: 'dark', icon: Moon, label: 'Dark Mode' },
    { name: 'ocean', icon: Waves, label: 'Ocean Deep Blue' },
    { name: 'terminal', icon: Terminal, label: 'Terminal Coding' }
  ];

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', page: 'dashboard' },
    { icon: BarChart, label: 'Analytics', path: '/analytics', page: 'analytics' },
    { icon: Calendar, label: 'Calendar', path: '/calendar', page: 'calendar' },
    { icon: Clock, label: 'Monitor Expired', path: '/monitor-expired', page: 'monitor-expired' },
    { icon: Truck, label: 'Route', path: '/route', page: 'route' },
    { icon: Settings, label: 'Settings', path: '/settings', page: 'settings' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setActivePage(activePage === 'settings' ? 'dashboard' : 'settings');
  };

  const handleZoomChange = (value) => {
    setZoomLevel(value);
    document.body.style.zoom = `${value}%`;
  };

  const resetZoom = () => {
    setZoomLevel(100);
    document.body.style.zoom = '100%';
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value}px`;
  };

  const resetFontSize = () => {
    setFontSize(16);
    document.documentElement.style.fontSize = '16px';
  };

  // Click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Check if click is not on toggle button or theme buttons
        const toggleButton = event.target.closest('.toggle-btn');
        const themeButtons = event.target.closest('.theme-switcher-header');
        if (!toggleButton && !themeButtons && isSidebarOpen) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className={`app-container theme-${theme}`}>
      {/* Sidebar */}
      <aside ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">PS</div>
            {isSidebarOpen && <h2 className="logo-text">Pro Sidebar</h2>}
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a 
                key={index} 
                href={item.path} 
                className={`nav-item ${activePage === item.page ? 'active' : ''}`}
                title={!isSidebarOpen ? item.label : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(item.page);
                }}
              >
                <Icon className="nav-icon" size={22} />
                {isSidebarOpen && <span className="nav-label">{item.label}</span>}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-bar">
          <h1 className="page-title">Welcome to Pro Sidebar</h1>
          <div className="header-actions">
            <button className="settings-btn" onClick={toggleSettings} title="Settings">
              <Settings size={20} />
            </button>
            <button className="toggle-btn" onClick={toggleSidebar}>
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        <div className="content-area">
          {activePage === 'route' ? (
            <Route />
          ) : activePage === 'calendar' ? (
            <CalendarPage />
          ) : activePage === 'monitor-expired' ? (
            <MonitorExpired />
          ) : activePage === 'settings' ? (
            <div className="settings-page">
              <div className="settings-header">
                <h1>Settings</h1>
                <p>Customize your application preferences</p>
              </div>
              
              <div className="settings-card">
                <h2>Theme Selection</h2>
                <p className="settings-description">Choose your preferred color theme</p>
                
                <div className="theme-grid">
                  {themes.map((t) => {
                    const ThemeIcon = t.icon;
                    return (
                      <button
                        key={t.name}
                        className={`theme-card ${theme === t.name ? 'active' : ''}`}
                        onClick={() => setTheme(t.name)}
                      >
                        <div className="theme-icon">
                          <ThemeIcon size={32} />
                        </div>
                        <h3>{t.label}</h3>
                        {theme === t.name && <div className="active-badge">Active</div>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="settings-card">
                <h2>Display Settings</h2>
                <p className="settings-description">Adjust zoom and font size for better visibility and readability</p>
                
                <div className="display-controls">
                  {/* Zoom Control */}
                  <div className="control-section">
                    <h3 className="control-title">Screen Zoom</h3>
                    <div className="control-display">
                      <span className="control-label">Current Zoom:</span>
                      <span className="control-value">{zoomLevel}%</span>
                    </div>
                    
                    <div className="control-slider-container">
                      <input
                        type="range"
                        min="50"
                        max="150"
                        step="5"
                        value={zoomLevel}
                        onChange={(e) => handleZoomChange(Number(e.target.value))}
                        className="control-slider"
                      />
                      <div className="control-marks">
                        <span>50%</span>
                        <span>100%</span>
                        <span>150%</span>
                      </div>
                    </div>

                    <div className="control-buttons">
                      <button onClick={() => handleZoomChange(Math.max(50, zoomLevel - 10))} className="control-btn">
                        − Zoom Out
                      </button>
                      <button onClick={resetZoom} className="control-btn reset">
                        Reset
                      </button>
                      <button onClick={() => handleZoomChange(Math.min(150, zoomLevel + 10))} className="control-btn">
                        + Zoom In
                      </button>
                    </div>
                  </div>

                  <div className="divider"></div>

                  {/* Font Size Control */}
                  <div className="control-section">
                    <h3 className="control-title">Font Size</h3>
                    <div className="control-display">
                      <span className="control-label">Current Size:</span>
                      <span className="control-value">{fontSize}px</span>
                    </div>
                    
                    <div className="control-slider-container">
                      <input
                        type="range"
                        min="12"
                        max="24"
                        step="1"
                        value={fontSize}
                        onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                        className="control-slider"
                      />
                      <div className="control-marks">
                        <span>12px</span>
                        <span>16px</span>
                        <span>24px</span>
                      </div>
                    </div>

                    <div className="font-size-preview">
                      <p style={{ fontSize: `${fontSize}px` }}>
                        Preview: The quick brown fox jumps over the lazy dog
                      </p>
                    </div>

                    <div className="control-buttons">
                      <button onClick={() => handleFontSizeChange(Math.max(12, fontSize - 2))} className="control-btn">
                        A− Smaller
                      </button>
                      <button onClick={resetFontSize} className="control-btn reset">
                        Reset
                      </button>
                      <button onClick={() => handleFontSizeChange(Math.min(24, fontSize + 2))} className="control-btn">
                        A+ Larger
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h2>Application Info</h2>
                <p className="settings-description">Information about this application</p>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Version:</span>
                    <span className="info-value">1.0.0</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Updated:</span>
                    <span className="info-value">December 2025</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Framework:</span>
                    <span className="info-value">React + Vite</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="welcome-card">
                <h2>Modern Pro Sidebar</h2>
                <p>Sidebar profesional dengan 4 tema yang berbeda:</p>
                <ul className="feature-list">
                  <li>🌞 Light Mode - Tema terang yang nyaman</li>
                  <li>🌙 Dark Mode - Tema gelap untuk mata</li>
                  <li>🌊 Ocean Deep Blue - Tema biru laut yang tenang</li>
                  <li>💻 Terminal Coding - Tema seperti terminal coding</li>
                </ul>
                <p className="instruction">
                  Klik tombol di kiri atas untuk membuka/menutup sidebar dengan animasi smooth.
                  Pilih tema favorit Anda di bagian bawah sidebar!
                </p>
              </div>

              <div className="demo-cards">
                <div className="demo-card">
                  <BarChart size={40} />
                  <h3>Analytics</h3>
                  <p>Track your performance metrics</p>
                </div>
                <div className="demo-card">
                  <Truck size={40} />
                  <h3>Route Management</h3>
                  <p>Manage your delivery routes</p>
                </div>
                <div className="demo-card">
                  <MessageSquare size={40} />
                  <h3>Messages</h3>
                  <p>Stay connected with your team</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
