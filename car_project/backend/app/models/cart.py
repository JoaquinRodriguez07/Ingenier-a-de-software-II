from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.db.base import Base


class Cart(Base):
    __tablename__ = "cart"

    client_id = Column(Integer, ForeignKey("client.user_id"), primary_key=True)

    client = relationship("Client", back_populates="cart")
    items = relationship(
        "CartItem",
        back_populates="cart",
        cascade="all, delete-orphan",
    )
