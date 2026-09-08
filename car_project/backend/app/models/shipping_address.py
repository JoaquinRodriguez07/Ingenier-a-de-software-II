from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class ShippingAddress(Base):
    __tablename__ = "shipping_address"

    shipping_address_id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("client.user_id"), nullable=False)
    address = Column(String(255), nullable=False)

    client = relationship("Client", back_populates="shipping_addresses")
