import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class VerticalNavbar extends Component {
  render() {
    const { isSidebarOpen, toggleSidebar, closeSidebar } = this.props;

    return (
      <>
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger-menu-btn ${isSidebarOpen ? 'open' : ''}`}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay for mobile and desktop when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="sidebar-overlay"
            onClick={closeSidebar}
          />
        )}

        {/* Vertical Sidebar */}
        <div className={`vertical-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          {/* Logo/Brand */}
          <div className="sidebar-header">
            <Link 
              to="/" 
              className="navbar-brand"
              onClick={closeSidebar}
            >
              NewsApp
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="sidebar-nav">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${this.props.activeCategory === 'general' ? 'active' : ''}`} 
                  to="/general"
                  onClick={closeSidebar}
                >
                  <span>🏠</span>
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${this.props.activeCategory === 'business' ? 'active' : ''}`} 
                  to="/business"
                  onClick={closeSidebar}
                >
                  <span>💼</span>
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${this.props.activeCategory === 'entertainment' ? 'active' : ''}`} 
                  to="/entertainment"
                  onClick={closeSidebar}
                >
                  <span>🎬</span>
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${this.props.activeCategory === 'health' ? 'active' : ''}`} 
                  to="/health"
                  onClick={closeSidebar}
                >
                  <span>🏥</span>
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${this.props.activeCategory === 'science' ? 'active' : ''}`} 
                  to="/science"
                  onClick={closeSidebar}
                >
                  <span>🔬</span>
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${this.props.activeCategory === 'sports' ? 'active' : ''}`} 
                  to="/sports"
                  onClick={closeSidebar}
                >
                  <span>⚽</span>
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${this.props.activeCategory === 'technology' ? 'active' : ''}`} 
                  to="/technology"
                  onClick={closeSidebar}
                >
                  <span>💻</span>
                  Technology
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <small className="text-muted d-block text-center">
              © 2024 NewsApp
            </small>
          </div>
        </div>
      </>
    );
  }
}

export default VerticalNavbar;
