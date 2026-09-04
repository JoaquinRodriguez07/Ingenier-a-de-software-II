from fastapi import APIRouter

from app.api.v1.endpoints import marcas
from app.api.v1.endpoints import repuestos

api_router = APIRouter()
api_router.include_router(marcas.router)
api_router.include_router(repuestos.router)