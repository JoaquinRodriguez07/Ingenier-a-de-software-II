from enum import Enum

from sqlalchemy import Column, Enum as SQLAlchemyEnum, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.db.base import Base


class OrderState(str, Enum):
    PENDING = "pending"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"


class Order(Base):
    __tablename__ = "order"

    order_id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("client.user_id"), nullable=False)
    state = Column(
        SQLAlchemyEnum(
            OrderState,
            name="order_state",
            values_callable=lambda enum_type: [state.value for state in enum_type],
        ),
        nullable=False,
        default=OrderState.PENDING,
    )

    client = relationship("Client", back_populates="orders")
    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
    )
