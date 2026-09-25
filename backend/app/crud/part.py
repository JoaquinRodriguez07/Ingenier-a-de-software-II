from typing import Optional

from sqlalchemy import and_, or_, select
from sqlalchemy.orm import Session, selectinload

from app.models.car_model import CarModel
from app.models.compatibility import Compatibility
from app.models.part import Part


def list_parts(
    db: Session,
    search: Optional[str] = None,
    category: Optional[str] = None,
    brand: Optional[str] = None,
    model: Optional[str] = None,
    year: Optional[int] = None,
) -> list[Part]:
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

    # Filtro de categoría (HU 1.2), coincidencia exacta insensible a mayúsculas.
    if category and category.strip():
        query = query.where(Part.category.ilike(category.strip()))

    # Filtro de vehículo compatible (HU 2.5 / HU 2.3): marca, modelo y/o año.
    # Se acumulan entre sí (AND) y con los filtros de arriba, todos dentro
    # del mismo GET /parts (ej: ?search=filtro&brand=Chevrolet&year=2019).
    if brand or model or year:
        vehicle_conditions = []

        if brand and brand.strip():
            vehicle_conditions.append(CarModel.brand.ilike(brand.strip()))

        if model and model.strip():
            vehicle_conditions.append(CarModel.model.ilike(model.strip()))

        if year:
            vehicle_conditions.append(Compatibility.year_from <= year)
            vehicle_conditions.append(Compatibility.year_to >= year)

        matching_part_ids = (
            select(Compatibility.part_id)
            .join(CarModel, Compatibility.car_model_id == CarModel.id)
            .where(and_(*vehicle_conditions))
        )
        query = query.where(Part.id.in_(matching_part_ids))

    return list(db.scalars(query).all())