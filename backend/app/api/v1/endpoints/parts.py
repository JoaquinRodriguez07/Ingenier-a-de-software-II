from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud import part as crud_part
from app.schemas.part import PartsResponse, build_part_out


router = APIRouter(prefix="/parts", tags=["parts"])


@router.get("", response_model=PartsResponse)
def list_parts(
    brand: str | None = Query(default=None),
    model: str | None = Query(default=None),
    year: int | None = Query(default=None),
    db: Session = Depends(get_db),
):
    parts = crud_part.list_parts(
        db,
        brand=brand,
        model=model,
        year=year,
    )

    return {
        "parts": [
            build_part_out(part)
            for part in parts
        ]
    }