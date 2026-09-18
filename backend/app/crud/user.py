from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User


def get_user_by_email(db: Session, email: str) -> User | None:
    query = select(User).where(User.email == email)
    return db.scalars(query).first()
