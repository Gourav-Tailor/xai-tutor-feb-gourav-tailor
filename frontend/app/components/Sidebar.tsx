'use client';

import React from 'react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        {/* Main Navigation */}
        <div className="nav-section">
          <div className="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span>Notifications</span>
          </div>
          <div className="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 2C5.134 2 2 5.134 2 9v4c0 3.866 3.134 7 7 7h6c3.866 0 7-3.134 7-7V9c0-3.866-3.134-7-7-7H9zm0 2h6c2.761 0 5 2.239 5 5v4c0 2.761-2.239 5-5 5H9c-2.761 0-5-2.239-5-5V9c0-2.761 2.239-5 5-5z" />
            </svg>
            <span>Tasks</span>
          </div>
          <div className="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-7h-4v4h4v-4z" />
            </svg>
            <span>Calendar</span>
          </div>
          <div className="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            <span>Widgets</span>
          </div>
        </div>

        {/* Marketing Section */}
        <div className="nav-section">
          <h3 className="section-title">Marketing</h3>
          <div className="nav-item">
            <span>Product</span>
          </div>
          <div className="nav-item active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>Emails</span>
          </div>
          <div className="nav-item">
            <span>Integration</span>
          </div>
          <div className="nav-item">
            <span>Contacts</span>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="nav-section">
          <h3 className="section-title">Favorites</h3>
          <div className="nav-item favorite" style={{ borderLeftColor: '#EF4444' }}>
            <span className="color-badge" style={{ backgroundColor: '#EF4444' }}></span>
            <span>Opportunity Stages</span>
          </div>
          <div className="nav-item favorite" style={{ borderLeftColor: '#10B981' }}>
            <span className="color-badge" style={{ backgroundColor: '#10B981' }}></span>
            <span>Key Metrics</span>
          </div>
          <div className="nav-item favorite" style={{ borderLeftColor: '#F59E0B' }}>
            <span className="color-badge" style={{ backgroundColor: '#F59E0B' }}></span>
            <span>Product Plan</span>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        <div className="bottom-nav">
          <div className="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.35c.15-.12.19-.34.1-.51l-1.63-2.83c-.12-.22-.37-.29-.59-.22l-2.03.81c-.42-.32-.9-.6-1.44-.84l-.3-2.16c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41L9.1 4.46c-.54.24-1.02.52-1.44.84l-2.03-.81c-.22-.09-.47 0-.59.22L3.4 8.27c-.1.17-.05.39.1.51l1.72 1.35c-.05.3-.07.62-.07.94s.02.64.07.94l-1.72 1.35c-.15.12-.19.34-.1.51l1.63 2.83c.12.22.37.29.59.22l2.03-.81c.42.32.9.6 1.44.84l.3 2.16c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.3-2.16c.54-.24 1.02-.52 1.44-.84l2.03.81c.22.09.47 0 .59-.22l1.63-2.83c.12-.22.07-.39-.1-.51l-1.72-1.35zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
            <span>Settings</span>
          </div>
          <div className="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>Help & Center</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <div className="user-avatar">RB</div>
          <div className="user-info">
            <div className="user-name">Richard Brown</div>
            <div className="storage-indicator">
              <div className="storage-bar">
                <div className="storage-used" style={{ width: '62%' }}></div>
              </div>
              <div className="storage-text">6.2GB of 10GB</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
