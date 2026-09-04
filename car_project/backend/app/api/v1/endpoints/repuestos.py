from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud import repuesto as crud_repuesto
from app.schemas.repuesto import RepuestosResponse, armar_repuesto_out

router = APIRouter(prefix="/repuestos", tags=["repuestos"])


@router.get("", response_model = RepuestosResponse)
def listar_repuestos(db: Session = Depends(get_db)):
    repuestos = crud_repuesto.listar(db)
    return {"repuestos": [armar_repuesto_out(r) for r in repuestos]}