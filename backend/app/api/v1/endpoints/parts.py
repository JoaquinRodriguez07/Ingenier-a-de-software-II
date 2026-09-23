from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud import part as crud_part
from app.schemas.part import PartsResponse, build_part_out

router = APIRouter(prefix="/parts", tags=["parts"])


@router.get("", response_model=PartsResponse)
def list_parts(
    db: Session = Depends(get_db),
    search: Optional[str] = Query(
        None,
        min_length=1,
        description=(
            "Texto para buscar repuestos por nombre o código de forma parcial "
            "(no distingue mayúsculas/minúsculas). No es necesario ingresar "
            "el código completo."
        ),
    ),
    q: Optional[str] = Query(
        None,
        min_length=1,
        description="Alias de 'search'. Si se envían ambos, 'search' tiene prioridad.",
    ),
):
    termino_busqueda = search or q
    parts = crud_part.list_parts(db, search=termino_busqueda)
    return {"parts": [build_part_out(p) for p in parts]}