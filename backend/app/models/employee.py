from sqlalchemy import Column, ForeignKey, Integer

from app.models.user import User


class Employee(User):
    __tablename__ = "employee"

    user_id = Column(Integer, ForeignKey("user.user_id"), primary_key=True)
    __mapper_args__ = {"polymorphic_identity": "employee"}
