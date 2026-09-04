from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base

class Part(Base):
    __tablename__ = "part"

    id = Column(Integer, primary_key = True)
    part_code = Column(String(50), nullable = False)
    name = Column(String(120), nullable = False)
    category = Column(String(60), nullable = False)
    color = Column(String(40), nullable = True)
    price = Column(Integer, nullable = False)
    stock = Column(Integer, nullable = False, default = 0)

    compatibilities = relationship("Compatibility", back_populates = "part")