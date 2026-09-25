from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.part import Part
from app.models.compatibility import Compatibility
from app.models.car_model import CarModel


def list_parts(
    db: Session,
    brand: str | None = None,
    model: str | None = None,
    year: int | None = None,
) -> list[Part]:

    query = (
        select(Part)
        .join(Compatibility)
        .join(CarModel)
        .options(
            selectinload(Part.compatibilities).selectinload(
                Compatibility.car_model
            )
        )
        .distinct()
        .order_by(Part.id)
    )

    if brand:
        query = query.where(CarModel.brand == brand)

    if model:
        query = query.where(CarModel.model == model)

    if year:
        query = query.where(
            Compatibility.year_from <= year,
            Compatibility.year_to >= year,
        )

    return list(db.scalars(query).unique().all())