'use client';

import React, { useState } from 'react';

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

interface EmailDetailProps {
  email: Email;
  onArchive: () => void;
  onDelete: () => void;
  onMarkAsRead: (isRead: boolean) => void;
}

export default function EmailDetail({ email, onArchive, onDelete, onMarkAsRead }: EmailDetailProps) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          sender_name: 'You',
          sender_email: 'richard@company.com',
          recipient: email.sender_email,
          subject: `Re: ${email.subject}`,
          body: replyText,
          sender_avatar: '👤',
        }).toString(),
      });

      if (response.ok) {
        setReplyText('');
        setShowReply(false);
        // Optionally refresh the email list
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="email-detail-view">
      {/* Email Header */}
      <div className="detail-header">
        <div className="sender-info">
          <div className="sender-avatar-large">{email.sender_avatar}</div>
          <div className="sender-details">
            <div className="sender-name-large">{email.sender_name}</div>
            <div className="sender-email-info">{email.sender_email}</div>
            <div className="email-meta">to {email.recipient} • {email.date_time}</div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="icon-btn" onClick={() => onMarkAsRead(!email.is_read)} title="Mark as read">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 4v6h6M23 20v-6h-6" strokeWidth="2" />
              <path d="M20.49 9A9 9 0 005.64 5.64M3.51 15A9 9 0 0018.36 18.36" strokeWidth="2" />
            </svg>
          </button>
          <button className="icon-btn" onClick={onArchive} title="Archive">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="21 8 21 21 3 21 3 8 M1 3 L23 3"></polyline>
              <line x1="10" y1="12" x2="14" y2="12"></line>
            </svg>
          </button>
          <button className="icon-btn" title="Forward">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8l4 4m0 0l-4 4m4-4H2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button className="icon-btn" title="More options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="6" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="18" cy="12" r="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="detail-divider"></div>

      {/* Email Subject */}
      <div className="detail-content">
        <h2 className="email-title">{email.subject}</h2>

        {/* Email Body */}
        <div className="email-body">
          {email.body.split('\n').map((line, idx) => (
            <p key={idx}>{line || <br />}</p>
          ))}
        </div>

        {/* Attachments */}
        {email.attachments && (
          <div className="attachments-section">
            <h4>Attachments</h4>
            <div className="attachment-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
              <span className="filename">{email.attachments}</span>
              <button className="download-btn">Download</button>
            </div>
          </div>
        )}
      </div>

      {/* Reply Composer */}
      {showReply ? (
        <div className="reply-composer">
          <div className="composer-header">
            <h3>Reply to {email.sender_name}</h3>
            <button onClick={() => setShowReply(false)} className="close-btn">
              ✕
            </button>
          </div>

          <div className="recipient-selector">
            <label>To:</label>
            <input type="email" value={email.sender_email} readOnly className="recipient-input" />
          </div>

          <div className="composer-body">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="reply-textarea"
            />
          </div>

          <div className="composer-toolbar">
            <div className="toolbar-icons">
              <button className="toolbar-btn" title="Attach file">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 5.23 11.08 5 12 5c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 15.5 24 14.08 24 12.5c0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
              </button>
              <button className="toolbar-btn" title="Add emoji">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="9" r="1.5" fill="currentColor" />
                  <path d="M8 14c1 1 2.5 2 4 2s3-1 4-2" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <div className="composer-actions">
              <button onClick={handleSendReply} className="send-btn">
                Send Now
              </button>
              <button className="schedule-btn" title="Schedule send">
                ▼
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="reply-prompt">
          <button onClick={() => setShowReply(true)} className="reply-btn">
            ↩️ Reply
          </button>
        </div>
      )}
    </div>
  );
}
