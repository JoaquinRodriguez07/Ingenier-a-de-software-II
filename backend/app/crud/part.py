from typing import Optional

from sqlalchemy import or_, select
from sqlalchemy.orm import Session, selectinload

from app.models.part import Part
from app.models.compatibility import Compatibility


def list_parts(db: Session, search: Optional[str] = None) -> list[Part]:
    query = (
        select(Part)
        .options(
            selectinload(Part.compatibilities).selectinload(
                Compatibility.car_model
            )
        )
        .order_by(Part.id)
    )

    # Búsqueda parcial, insensible a mayúsculas/minúsculas, por nombre o código.
    # Permite encontrar un repuesto sin ingresar el código completo
    # (ej: "BP12" encuentra "BP1234").
    term = (search or "").strip()
    if term:
        pattern = f"%{term}%"
        query = query.where(
            or_(
                Part.name.ilike(pattern),
                Part.part_code.ilike(pattern),
            )
        )

    return list(db.scalars(query).all())