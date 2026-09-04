from sqlalchemy import Column, Integer, String

from app.db.base import Base


class ModeloAuto(Base):
    __tablename__ = "modelo_auto"

    id_modelo = Column(Integer, primary_key = True)
    marca = Column(String(60), nullable = False)
    modelo = Column(String(60), nullable = False)
    codigo_motor = Column(String(60), nullable = True)