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
    category: Optional[str] = Query(
        None, description="Filtra por categoría exacta (ej: 'Frenos')."
    ),
    categoria: Optional[str] = Query(
        None, description="Alias de 'category'."
    ),
    brand: Optional[str] = Query(
        None, description="Filtra por marca del vehículo compatible (ej: 'Ford')."
    ),
    marca: Optional[str] = Query(None, description="Alias de 'brand'."),
    model: Optional[str] = Query(
        None, description="Filtra por modelo del vehículo compatible (ej: 'Fiesta')."
    ),
    modelo: Optional[str] = Query(None, description="Alias de 'model'."),
    year: Optional[int] = Query(
        None,
        description="Filtra por año del vehículo (debe caer entre year_from y year_to de alguna compatibilidad).",
    ),
    anio: Optional[int] = Query(None, description="Alias de 'year'."),
):
    # Todos los filtros son acumulables entre sí: se pueden combinar
    # search + category + brand + model + year en el mismo pedido
    # (ej: GET /api/v1/parts?search=filtro&brand=Ford&year=2019).
    termino_busqueda = search or q
    parts = crud_part.list_parts(
        db,
        search=termino_busqueda,
        category=category or categoria,
        brand=brand or marca,
        model=model or modelo,
        year=year or anio,
    )
    return {"parts": [build_part_out(p) for p in parts]}