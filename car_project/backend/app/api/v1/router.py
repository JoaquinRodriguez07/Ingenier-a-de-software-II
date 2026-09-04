from fastapi import APIRouter

from app.api.v1.endpoints import brands, parts

api_router = APIRouter()
api_router.include_router(brands.router)
api_router.include_router(parts.router)