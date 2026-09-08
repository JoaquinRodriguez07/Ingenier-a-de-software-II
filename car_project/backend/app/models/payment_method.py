from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class PaymentMethod(Base):
    __tablename__ = "payment_method"

    payment_method_id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("client.user_id"), nullable=False)
    method = Column(String(60), nullable=False)

    client = relationship("Client", back_populates="payment_methods")
