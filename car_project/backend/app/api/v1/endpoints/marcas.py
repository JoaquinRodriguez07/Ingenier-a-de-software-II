from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.marca import MarcasResponse
from app.crud import modelo_auto as crud_modelo
from app.api.deps import get_db


router = APIRouter(prefix="/marcas", tags=["marcas"])

@router.get("", response_model = MarcasResponse)
def listar_marcas(db: Session = Depends(get_db)):
    return {"marcas": crud_modelo.listar_marcas_con_modelos(db)}