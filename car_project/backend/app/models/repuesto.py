from sqlalchemy import Column, Integer, String

from app.db.base import Base

class Repuesto(Base):
    __tablename__ = "repuesto"

    id_repuesto = Column(Integer, primary_key = True)
    codigo_repuesto = Column(String(50), nullable = False)
    nombre = Column(String(120), nullable = False)
    categoria = Column(String(60), nullable = False)
    color = Column(String(40), nullable = True)
    precio = Column(Integer, nullable = False)
    stock = Column(Integer, nullable = False, default = 0)