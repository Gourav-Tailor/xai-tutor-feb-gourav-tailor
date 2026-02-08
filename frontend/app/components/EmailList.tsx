'use client';

import React from 'react';

interface Email {
  id: number;
  sender_name: string;
  sender_email: string;
  sender_avatar: string;
  recipient: string;
  subject: string;
  body: string;
  preview: string;
  date_time: string;
  is_read: boolean;
  is_archived: boolean;
  attachments: string | null;
  created_at: string;
  updated_at: string;
}

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  filter: 'all' | 'unread' | 'archive';
  onFilterChange: (filter: 'all' | 'unread' | 'archive') => void;
  onSelectEmail: (email: Email) => void;
  loading: boolean;
}

export default function EmailList({
  emails,
  selectedEmail,
  filter,
  onFilterChange,
  onSelectEmail,
  loading,
}: EmailListProps) {
  return (
    <div className="email-list-panel">
      {/* Tab Filters */}
      <div className="email-tabs">
        <button
          className={`tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All Mails
        </button>
        <button
          className={`tab ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => onFilterChange('unread')}
        >
          Unread
        </button>
        <button
          className={`tab ${filter === 'archive' ? 'active' : ''}`}
          onClick={() => onFilterChange('archive')}
        >
          Archive
        </button>
      </div>

      {/* Email List */}
      <div className="email-list">
        {loading ? (
          <div className="empty-state">Loading emails...</div>
        ) : emails.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No emails found</h3>
            <p>try adjusting your filters</p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className={`email-item ${selectedEmail?.id === email.id ? 'selected' : ''} ${
                !email.is_read ? 'unread' : ''
              }`}
              onClick={() => onSelectEmail(email)}
            >
              <div className="email-avatar">{email.sender_avatar}</div>

              <div className="email-content">
                <div className="email-header">
                  <div className="sender-name">{email.sender_name}</div>
                  <div className="email-date">{email.date_time}</div>
                </div>
                <div className="email-subject">{email.subject}</div>
                <div className="email-preview">{email.preview}</div>
              </div>

              {!email.is_read && <div className="unread-indicator"></div>}

              <div className="email-actions">
                <button className="action-btn" title="Archive">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="21 8 21 21 3 21 3 8 M1 3 L23 3"></polyline>
                    <polyline points="10 12 14 16 18 12"></polyline>
                    <line x1="14" y1="16" x2="14" y2="8"></line>
                  </svg>
                </button>
                <button className="action-btn" title="Forward">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 8l4 4m0 0l-4 4m4-4H2" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button className="action-btn" title="More options">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="6" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="18" cy="12" r="2" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
