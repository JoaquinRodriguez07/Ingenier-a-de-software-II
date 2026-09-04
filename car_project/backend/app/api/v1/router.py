from fastapi import APIRouter

from app.api.v1.endpoints import marcas

api_router = APIRouter()
api_router.include_router(marcas.router)