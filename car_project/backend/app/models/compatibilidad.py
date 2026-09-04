from sqlalchemy import Column, Integer, ForeignKey

from app.db.base import Base

class Compatibilidad(Base):
    __tablename__ = "compatibilidad"

    id_repuesto = Column(Integer, ForeignKey("repuesto.id_repuesto"), primary_key = True)
    id_modelo = Column(Integer, ForeignKey("modelo_auto.id_modelo"), primary_key = True)
    anio_desde = Column(Integer, nullable = False)
    anio_hasta = Column(Integer, nullable = False)