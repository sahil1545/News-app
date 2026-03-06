import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class VerticalNavbar extends Component {
  render() {
    const { isSidebarOpen, toggleSidebar, closeSidebar } = this.props;

    return (
      <>
        {/* Hamburger Menu Button */}
        <button 
          className="hamburger-menu-btn"
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: '15px',
            left: '15px',
            zIndex: '1001',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            width: '45px',
            height: '45px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#45a049';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#4CAF50';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <span 
            style={{
              width: '25px',
              height: '3px',
              backgroundColor: 'white',
              margin: '2px 0',
              transition: 'all 0.3s ease',
              borderRadius: '2px',
              transform: isSidebarOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0deg)'
            }}
          />
          <span 
            style={{
              width: '25px',
              height: '3px',
              backgroundColor: 'white',
              margin: '2px 0',
              transition: 'all 0.3s ease',
              borderRadius: '2px',
              opacity: isSidebarOpen ? 0 : 1
            }}
          />
          <span 
            style={{
              width: '25px',
              height: '3px',
              backgroundColor: 'white',
              margin: '2px 0',
              transition: 'all 0.3s ease',
              borderRadius: '2px',
              transform: isSidebarOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0deg)'
            }}
          />
        </button>

        {/* Overlay for mobile and desktop when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="sidebar-overlay"
            onClick={closeSidebar}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: '999',
              opacity: 0,
              animation: 'fadeIn 0.3s ease forwards'
            }}
          />
        )}

        {/* Vertical Sidebar */}
        <div 
          className={`vertical-sidebar ${isSidebarOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            height: '100vh',
            width: '280px',
            backgroundColor: '#1e1f1f',
            borderRight: '1px solid #333',
            zIndex: '1000',
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
            overflowY: 'auto',
            boxShadow: isSidebarOpen ? '2px 0 10px rgba(0,0,0,0.3)' : 'none'
          }}
        >
          {/* Logo/Brand */}
          <div className="sidebar-header p-4" style={{ borderBottom: '1px solid #333' }}>
            <Link 
              to="/" 
              className="navbar-brand text-white text-decoration-none fs-4 fw-bold"
              onClick={closeSidebar}
              style={{ color: '#4CAF50' }}
            >
              NewsApp
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="sidebar-nav p-3">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item mb-2">
                <Link 
                  className="nav-link text-white d-flex align-items-center" 
                  to="/general"
                  onClick={closeSidebar}
                  style={{
                    backgroundColor: this.props.activeCategory === 'general' ? '#4CAF50' : 'transparent',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (this.props.activeCategory !== 'general') {
                      e.target.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (this.props.activeCategory !== 'general') {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="me-3">🏠</span>
                  General
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link 
                  className="nav-link text-white d-flex align-items-center" 
                  to="/business"
                  onClick={closeSidebar}
                  style={{
                    backgroundColor: this.props.activeCategory === 'business' ? '#4CAF50' : 'transparent',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (this.props.activeCategory !== 'business') {
                      e.target.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (this.props.activeCategory !== 'business') {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="me-3">💼</span>
                  Business
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link 
                  className="nav-link text-white d-flex align-items-center" 
                  to="/entertainment"
                  onClick={closeSidebar}
                  style={{
                    backgroundColor: this.props.activeCategory === 'entertainment' ? '#4CAF50' : 'transparent',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (this.props.activeCategory !== 'entertainment') {
                      e.target.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (this.props.activeCategory !== 'entertainment') {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="me-3">🎬</span>
                  Entertainment
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link 
                  className="nav-link text-white d-flex align-items-center" 
                  to="/health"
                  onClick={closeSidebar}
                  style={{
                    backgroundColor: this.props.activeCategory === 'health' ? '#4CAF50' : 'transparent',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (this.props.activeCategory !== 'health') {
                      e.target.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (this.props.activeCategory !== 'health') {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="me-3">🏥</span>
                  Health
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link 
                  className="nav-link text-white d-flex align-items-center" 
                  to="/science"
                  onClick={closeSidebar}
                  style={{
                    backgroundColor: this.props.activeCategory === 'science' ? '#4CAF50' : 'transparent',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (this.props.activeCategory !== 'science') {
                      e.target.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (this.props.activeCategory !== 'science') {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="me-3">🔬</span>
                  Science
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link 
                  className="nav-link text-white d-flex align-items-center" 
                  to="/sports"
                  onClick={closeSidebar}
                  style={{
                    backgroundColor: this.props.activeCategory === 'sports' ? '#4CAF50' : 'transparent',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (this.props.activeCategory !== 'sports') {
                      e.target.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (this.props.activeCategory !== 'sports') {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="me-3">⚽</span>
                  Sports
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link 
                  className="nav-link text-white d-flex align-items-center" 
                  to="/technology"
                  onClick={closeSidebar}
                  style={{
                    backgroundColor: this.props.activeCategory === 'technology' ? '#4CAF50' : 'transparent',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (this.props.activeCategory !== 'technology') {
                      e.target.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (this.props.activeCategory !== 'technology') {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="me-3">💻</span>
                  Technology
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="sidebar-footer p-3 mt-auto" style={{ borderTop: '1px solid #333' }}>
            <small className="text-muted d-block text-center">
              © 2024 NewsApp
            </small>
          </div>
        </div>

        {/* Add animations to document */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </>
    );
  }
}

export default VerticalNavbar;
