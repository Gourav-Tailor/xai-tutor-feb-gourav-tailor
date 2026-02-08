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
        <div className="brand">
          <span className="brand-icon">🟠</span>
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
