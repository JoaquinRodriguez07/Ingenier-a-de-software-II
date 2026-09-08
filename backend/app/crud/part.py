from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.part import Part
from app.models.compatibility import Compatibility


def list_parts(db: Session) -> list[Part]:
    query = (
        select(Part)
        .options(
            selectinload(Part.compatibilities).selectinload(
                Compatibility.car_model
            )
        )
        .order_by(Part.id)
    )
    return list(db.scalars(query).all())