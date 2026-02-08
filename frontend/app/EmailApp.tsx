'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import './email.css';

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

export default function EmailApp() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archive'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch emails
  useEffect(() => {
    fetchEmails();
  }, [filter]);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === 'unread') params.append('unread_only', 'true');
      if (filter === 'archive') params.append('archived_only', 'true');

      const response = await fetch(`http://localhost:8000/emails?${params}`);
      const data = await response.json();
      setEmails(data.emails);
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSelect = async (email: Email) => {
    // Immediately set the email to show the detail view
    setSelectedEmail(email);
    
    // Fetch full email details to ensure we have the latest data
    try {
      const response = await fetch(`http://localhost:8000/emails/${email.id}`);
      if (response.ok) {
        const fullEmail = await response.json();
        setSelectedEmail(fullEmail);
        // Mark email as read if not already read
        if (!fullEmail.is_read) {
          updateEmail(fullEmail.id, { is_read: true });
        }
      } else {
        // If fetch fails, email is already set above, just mark as read
        if (!email.is_read) {
          updateEmail(email.id, { is_read: true });
        }
      }
    } catch (error) {
      console.error('Error fetching email details:', error);
      // If fetch fails, email is already set above, just mark as read
      if (!email.is_read) {
        updateEmail(email.id, { is_read: true });
      }
    }
  };

  const updateEmail = async (
    emailId: number,
    updates: Partial<{ is_read: boolean; is_archived: boolean }>
  ) => {
    try {
      const params = new URLSearchParams();
      if (updates.is_read !== undefined) params.append('is_read', String(updates.is_read));
      if (updates.is_archived !== undefined) params.append('is_archived', String(updates.is_archived));

      const response = await fetch(`http://localhost:8000/emails/${emailId}?${params}`, {
        method: 'PUT',
      });

      if (response.ok) {
        const updatedEmail = await response.json();
        // Update the email in the list
        setEmails((prevEmails) =>
          prevEmails.map((e) => (e.id === emailId ? updatedEmail : e))
        );
        // Update selected email if it's the one being updated
        setSelectedEmail((prevSelected) => {
          if (prevSelected?.id === emailId) {
            return updatedEmail;
          }
          return prevSelected;
        });
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handleArchiveEmail = (email: Email) => {
    updateEmail(email.id, { is_archived: true });
    // Only clear selected email if we're filtering by non-archived emails
    if (selectedEmail?.id === email.id && filter !== 'archive') {
      setSelectedEmail(null);
    }
  };

  const handleDeleteEmail = async (emailId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/emails/${emailId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from emails list
        setEmails((prevEmails) => prevEmails.filter((e) => e.id !== emailId));
        // Clear selected email if it's the one being deleted
        setSelectedEmail((prevSelected) => {
          if (prevSelected?.id === emailId) {
            return null;
          }
          return prevSelected;
        });
      }
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="email-app">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="email-container">
        <Sidebar isOpen={sidebarOpen} />
        <div className="email-content">
          <EmailList
            emails={filteredEmails}
            selectedEmail={selectedEmail}
            filter={filter}
            onFilterChange={setFilter}
            onSelectEmail={handleEmailSelect}
            onArchiveEmail={handleArchiveEmail}
            loading={loading}
          />
          {selectedEmail && (
            <EmailDetail
              email={selectedEmail}
              onArchive={() => handleArchiveEmail(selectedEmail)}
              onDelete={() => handleDeleteEmail(selectedEmail.id)}
              onMarkAsRead={(isRead) => updateEmail(selectedEmail.id, { is_read: isRead })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
