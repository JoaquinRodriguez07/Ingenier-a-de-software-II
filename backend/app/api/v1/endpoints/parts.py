from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud import part as crud_part
from app.schemas.part import PartsResponse, build_part_out

router = APIRouter(prefix="/parts", tags=["parts"])


@router.get("", response_model=PartsResponse)
def list_parts(db: Session = Depends(get_db)):
    parts = crud_part.list_parts(db)
    return {"parts": [build_part_out(p) for p in parts]}