from typing import Optional

from pydantic import BaseModel

from app.models.repuesto import Repuesto


class RepuestoOut(BaseModel):
    id: int
    nombre: str
    marca_compatible: list[str]
    modelo_compatible: list[str]
    anio_desde: Optional[int]
    anio_hasta: Optional[int]
    codigo_motor: Optional[str]
    codigo_repuesto: str
    categoria: str
    color: Optional[str]
    precio: int
    stock: int

class RepuestosResponse(BaseModel):
    repuestos: list[RepuestoOut]


def armar_repuesto_out(repuesto: Repuesto) -> RepuestoOut:
    marcas = []
    modelos = []
    motores = set()
    anios_desde = []
    anios_hasta = []

    for compatibilidad in repuesto.compatibilidades:
        modelo_auto = compatibilidad.modelo
        if modelo_auto.marca not in marcas:
            marcas.append(modelo_auto.marca)
        if modelo_auto.modelo not in modelos:
            modelos.append(modelo_auto.modelo)
        motores.add(modelo_auto.codigo_motor)
        anios_desde.append(compatibilidad.anio_desde)
        anios_hasta.append(compatibilidad.anio_hasta)

    codigo_motor = motores.pop() if len(motores) == 1 else None

    return RepuestoOut(
        id=repuesto.id_repuesto,
        nombre=repuesto.nombre,
        marca_compatible=marcas,
        modelo_compatible=modelos,
        anio_desde=min(anios_desde) if anios_desde else None,
        anio_hasta=max(anios_hasta) if anios_hasta else None,
        codigo_motor=codigo_motor,
        codigo_repuesto=repuesto.codigo_repuesto,
        categoria=repuesto.categoria,
        color=repuesto.color,
        precio=repuesto.precio,
        stock=repuesto.stock,
    )