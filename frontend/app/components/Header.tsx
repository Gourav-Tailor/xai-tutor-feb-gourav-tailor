'use client';

import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ onToggleSidebar, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="collapse-btn"
          onClick={onToggleSidebar}
          title="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="brand">
          <svg className="brand-icon" width="18" height="18" viewBox="0 0 24 24" fill="#ff8c00" stroke="#ff8c00" strokeWidth="1.5">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="brand-name">Cusana</span>
        </div>
      </div>

      <div className="header-center">
        <h1 className="page-title">Emails</h1>
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" />
          </svg>
          <input
            type="text"
            placeholder="Search Email"
            className="search-input"
            value={searchQuery}
            onChange={(e: any) => onSearchChange(e.target.value)}
          />
          <span className="keyboard-shortcut">⌘K</span>
        </div>
      </div>

      <div className="header-right">
        <button className="new-message-btn">+ New Message</button>
      </div>
    </header>
  );
}
