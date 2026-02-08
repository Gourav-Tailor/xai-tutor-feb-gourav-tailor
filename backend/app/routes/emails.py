"""Email routes for CRUD operations."""
from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from app.database import get_db
from typing import Optional

email_router = APIRouter(prefix="/emails", tags=["emails"])


# Response schema models
class EmailResponse:
    def __init__(self, row):
        self.id = row[0]
        self.sender_name = row[1]
        self.sender_email = row[2]
        self.sender_avatar = row[3]
        self.recipient = row[4]
        self.subject = row[5]
        self.body = row[6]
        self.preview = row[7]
        self.date_time = row[8]
        self.is_read = bool(row[9])
        self.is_archived = bool(row[10])
        self.attachments = row[11]
        self.created_at = row[12]
        self.updated_at = row[13]

    def to_dict(self):
        return {
            "id": self.id,
            "sender_name": self.sender_name,
            "sender_email": self.sender_email,
            "sender_avatar": self.sender_avatar,
            "recipient": self.recipient,
            "subject": self.subject,
            "body": self.body,
            "preview": self.preview,
            "date_time": self.date_time,
            "is_read": self.is_read,
            "is_archived": self.is_archived,
            "attachments": self.attachments,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }


@email_router.get("")
def get_emails(
    unread_only: bool = Query(False),
    archived_only: bool = Query(False),
):
    """Fetch all emails with optional filters."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        if unread_only:
            cursor.execute(
                "SELECT * FROM emails WHERE is_read = 0 AND is_archived = 0 ORDER BY created_at DESC"
            )
        elif archived_only:
            cursor.execute(
                "SELECT * FROM emails WHERE is_archived = 1 ORDER BY created_at DESC"
            )
        else:
            cursor.execute(
                "SELECT * FROM emails WHERE is_archived = 0 ORDER BY created_at DESC"
            )
        
        rows = cursor.fetchall()
        emails = [EmailResponse(row).to_dict() for row in rows]
        
        return {"emails": emails, "count": len(emails)}


@email_router.get("/{email_id}")
def get_email(email_id: int):
    """Fetch a single email by ID."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM emails WHERE id = ?", (email_id,))
        row = cursor.fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail="Email not found")
        
        return EmailResponse(row).to_dict()


@email_router.post("")
def create_email(
    sender_name: str = Query(...),
    sender_email: str = Query(...),
    recipient: str = Query(...),
    subject: str = Query(...),
    body: str = Query(...),
    sender_avatar: Optional[str] = Query(None),
    attachments: Optional[str] = Query(None),
):
    """Create a new email."""
    now = datetime.utcnow().isoformat() + "Z"
    
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO emails (
                sender_name, sender_email, sender_avatar, recipient,
                subject, body, preview, date_time, is_read,
                is_archived, attachments, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?)
            """,
            (
                sender_name,
                sender_email,
                sender_avatar or "📧",
                recipient,
                subject,
                body,
                body[:100] + "..." if len(body) > 100 else body,
                datetime.now().strftime("%Y-%m-%d %I:%M %p"),
                attachments,
                now,
                now,
            ),
        )
        conn.commit()
        
        email_id = cursor.lastrowid
        cursor.execute("SELECT * FROM emails WHERE id = ?", (email_id,))
        row = cursor.fetchone()
        
        return EmailResponse(row).to_dict()


@email_router.put("/{email_id}")
def update_email(
    email_id: int,
    is_read: Optional[bool] = Query(None),
    is_archived: Optional[bool] = Query(None),
    subject: Optional[str] = Query(None),
    body: Optional[str] = Query(None),
):
    """Update an email (mark as read, archive, etc.)."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Check if email exists
        cursor.execute("SELECT * FROM emails WHERE id = ?", (email_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Email not found")
        
        # Build update query dynamically
        updates = []
        params = []
        
        if is_read is not None:
            updates.append("is_read = ?")
            params.append(is_read)
        
        if is_archived is not None:
            updates.append("is_archived = ?")
            params.append(is_archived)
        
        if subject is not None:
            updates.append("subject = ?")
            params.append(subject)
        
        if body is not None:
            updates.append("body = ?")
            params.append(body)
            updates.append("preview = ?")
            params.append(body[:100] + "..." if len(body) > 100 else body)
        
        if updates:
            updates.append("updated_at = ?")
            params.append(datetime.utcnow().isoformat() + "Z")
            params.append(email_id)
            
            query = f"UPDATE emails SET {', '.join(updates)} WHERE id = ?"
            cursor.execute(query, params)
            conn.commit()
        
        # Return updated email
        cursor.execute("SELECT * FROM emails WHERE id = ?", (email_id,))
        row = cursor.fetchone()
        return EmailResponse(row).to_dict()


@email_router.delete("/{email_id}")
def delete_email(email_id: int):
    """Delete an email."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Check if email exists
        cursor.execute("SELECT * FROM emails WHERE id = ?", (email_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Email not found")
        
        cursor.execute("DELETE FROM emails WHERE id = ?", (email_id,))
        conn.commit()
        
        return {"message": f"Email {email_id} deleted successfully"}
