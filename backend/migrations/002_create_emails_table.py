"""Migration: Create emails table"""
import sqlite3

def upgrade():
    """Create the emails table."""
    from app.database import get_db
    
    with get_db() as conn:
        cursor = conn.cursor()
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS emails (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sender_name TEXT NOT NULL,
                sender_email TEXT NOT NULL,
                sender_avatar TEXT,
                recipient TEXT NOT NULL,
                subject TEXT NOT NULL,
                body TEXT NOT NULL,
                preview TEXT,
                date_time TEXT NOT NULL,
                is_read BOOLEAN DEFAULT 0,
                is_archived BOOLEAN DEFAULT 0,
                attachments TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)
        
        # Insert sample data
        sample_emails = [
            {
                'sender_name': 'Sarah Anderson',
                'sender_email': 'sarah.anderson@acme.com',
                'sender_avatar': '🟠',
                'recipient': 'richard@company.com',
                'subject': '📊 Q1 Marketing Report',
                'body': '''Hi Richard,

I\'ve completed the Q1 marketing report and it looks great! The campaign performance exceeded our targets by 23%. 

Key highlights:
- Email open rate: 28.5%
- Click-through rate: 4.2%
- Conversion rate: 2.1%

Please review and let me know if you need any adjustments before presenting to the board.

Best regards,
Sarah''',
                'preview': 'I\'ve completed the Q1 marketing report and it looks great! The campaign performance...',
                'date_time': '2024-02-08 09:30 AM',
                'is_read': 0,
                'is_archived': 0,
                'attachments': 'Q1_Report.pdf',
                'created_at': '2024-02-08T09:30:00Z',
                'updated_at': '2024-02-08T09:30:00Z'
            },
            {
                'sender_name': 'Michael Chen',
                'sender_email': 'michael.chen@tech.com',
                'sender_avatar': '🔵',
                'recipient': 'richard@company.com',
                'subject': '🔧 System Maintenance Schedule',
                'body': '''Hey Richard,

The scheduled maintenance is set for this weekend. All systems will be down from 11 PM Saturday to 6 AM Sunday. Please inform your team.

Changes include:
- Database optimization
- Security patches
- Infrastructure upgrades

No action needed from you. We\'ll monitor everything.

Cheers,
Michael''',
                'preview': 'The scheduled maintenance is set for this weekend. All systems will be down from...',
                'date_time': '2024-02-07 03:45 PM',
                'is_read': 1,
                'is_archived': 0,
                'attachments': None,
                'created_at': '2024-02-07T15:45:00Z',
                'updated_at': '2024-02-07T15:45:00Z'
            },
            {
                'sender_name': 'Emma Williams',
                'sender_email': 'emma.williams@design.co',
                'sender_avatar': '🟣',
                'recipient': 'richard@company.com',
                'subject': '🎨 New Design System Update',
                'body': '''Hi Richard,

I\'ve uploaded the updated design system to Figma. The new components library includes improved accessibility features and better documentation.

Updates:
- 45 new components
- Comprehensive dark mode support
- WCAG 2.1 AA compliance

All team members have access. Let me know if you have questions!

Regards,
Emma''',
                'preview': 'I\'ve uploaded the updated design system to Figma. The new components library includes...',
                'date_time': '2024-02-06 02:15 PM',
                'is_read': 1,
                'is_archived': 0,
                'attachments': None,
                'created_at': '2024-02-06T14:15:00Z',
                'updated_at': '2024-02-06T14:15:00Z'
            },
            {
                'sender_name': 'David Johnson',
                'sender_email': 'david.johnson@sales.com',
                'sender_avatar': '🟢',
                'recipient': 'richard@company.com',
                'subject': '💼 Client Meeting Notes - Acme Corp',
                'body': '''Richard,

Just wrapping up the meeting with Acme Corp. Great news - they\'re interested in extending the contract for another year!

Discussion points:
- Budget increased by 20%
- Additional features requested
- New timeline: March 15th deployment

I\'ll send formal proposal tomorrow. Can we schedule a follow-up call?

David''',
                'preview': 'Just wrapping up the meeting with Acme Corp. Great news - they\'re interested in...',
                'date_time': '2024-02-05 11:30 AM',
                'is_read': 1,
                'is_archived': 0,
                'attachments': 'Meeting_Notes.docx',
                'created_at': '2024-02-05T11:30:00Z',
                'updated_at': '2024-02-05T11:30:00Z'
            },
            {
                'sender_name': 'Jessica Lee',
                'sender_email': 'jessica.lee@hr.com',
                'sender_avatar': '🟡',
                'recipient': 'richard@company.com',
                'subject': '👥 Team Building Event - Friday 6 PM',
                'body': '''Hi Richard,

Reminder: Team building event this Friday at 6 PM at the rooftop lounge!

Details:
- Time: 6 PM - 9 PM
- Location: Rooftop Lounge (Building A)
- Dress Code: Business Casual
- RSVP by Thursday EOD

Looking forward to seeing you there!

Cheers,
Jessica''',
                'preview': 'Reminder: Team building event this Friday at 6 PM at the rooftop lounge!',
                'date_time': '2024-02-05 09:00 AM',
                'is_read': 1,
                'is_archived': 0,
                'attachments': None,
                'created_at': '2024-02-05T09:00:00Z',
                'updated_at': '2024-02-05T09:00:00Z'
            }
        ]
        
        for email in sample_emails:
            cursor.execute("""
                INSERT INTO emails (
                    sender_name, sender_email, sender_avatar, recipient,
                    subject, body, preview, date_time, is_read,
                    is_archived, attachments, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                email['sender_name'],
                email['sender_email'],
                email['sender_avatar'],
                email['recipient'],
                email['subject'],
                email['body'],
                email['preview'],
                email['date_time'],
                email['is_read'],
                email['is_archived'],
                email['attachments'],
                email['created_at'],
                email['updated_at']
            ))
        
        conn.commit()


def downgrade():
    """Drop the emails table."""
    from app.database import get_db
    
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DROP TABLE IF EXISTS emails")
        conn.commit()
